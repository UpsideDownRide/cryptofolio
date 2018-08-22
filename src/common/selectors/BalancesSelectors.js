import { getTransactions, getFirstTransactionDate } from 'common/transactions/transactionsSelectors'
import { getAllTickers } from 'common/cryptoPrices/tickersSelector'
import { createSelector } from 'reselect'
import { map, round } from 'lodash'
import { sum, rangeRight, reduce, mapKeys, mapValues, set, get, getOr, flow, has, add, subtract, keys, pick, filter } from 'lodash/fp'
import dayjs from 'dayjs'
//import moment from 'moment'
import { getTicker } from 'common/cryptoPrices/tickersSelector';
import createCachedSelector from 're-reselect';

const updater = (el, type, operation) => (res) => {
    if (!has(type, el)) return res

    const endOfDay = dayjs(el.date).endOf('day').valueOf()
    const [updateValue, currency, exchange] = [el[type].value, el[type].currency, el[type].exchange]
    const runningBalanceCurrency = `runningBalance.coins.${currency}`
    const runningBalanceExchange = `runningBalance.exchanges.${exchange}.${currency}`
    const dayBalanceCurrency = `${endOfDay}.coins.${currency}`
    const dayBalanceExchange = `${endOfDay}.exchanges.${exchange}.${currency}`

    const updatedRes = has(endOfDay, res) ? res : set(endOfDay, res.runningBalance, res)
    const updateKey = key => set(key, operation(getOr(0, key, res), updateValue))

    return flow(
        updateKey(dayBalanceCurrency),
        updateKey(dayBalanceExchange),
        updateKey(runningBalanceCurrency),
        updateKey(runningBalanceExchange),
    )(updatedRes)
}

const balanceUpdaters = (res, el) => {
    return flow(
        updater(el, 'in', add),
        updater(el, 'out', subtract),
        updater(el, 'fee', subtract),
    )(res)
}

const generateCurrentValues = (tickers, coinBalances) => (
    map(coinBalances, (val, key) =>
        ({
            currency: key,
            amount: val,
            price: getOr(0, key, tickers),
            trend: 0,
            value: getOr(0, key, tickers) * val
        }))
)

export const getBalances = createSelector(
    getTransactions,
    transactions => transactions && flow(
        reduce(balanceUpdaters, { runningBalance: { coins: {}, exchanges: {} } }),
        mapKeys(k => k === 'runningBalance' ? 'currentBalance' : k)
    )(transactions)
)

export const getBalancesForAllDates = createSelector(
    getBalances,
    getFirstTransactionDate,
    (balances, start) => {
        if (!balances) return false
        const generateBalances = (acc, date, i) => {
            if (has(date, balances)) {
                acc.arr.splice(i, 1, { ...balances[date], date: date })
                return ({ arr: acc.arr, last: { ...balances[date] } })
            }
            else {
                acc.arr.splice(i, 1, { ...acc.last, date: date })
                return (acc)
            }
        }
        const balancesObject = flow(
            start => dayjs().diff(dayjs(start).endOf('day'), 'days'),
            daysAgo => rangeRight(0, daysAgo + 2),
            daysArray => map(daysArray, daysAgo => dayjs().subtract(daysAgo, 'days').endOf('day').valueOf()),
            datesArray => datesArray.reduce(generateBalances, { arr: Array(datesArray.length).fill(), last: null }))(start)
        return balancesObject.arr
    }
)

const pickKeysExcept = exceptions => obj => pick(filter(s => !exceptions.includes(s), keys(obj)), obj)
const arraysFixLength = balances => obj => {
    const pricesLength = obj.data.length
    const histBalancesLength = balances.length - 1
    if (pricesLength >= histBalancesLength) {
        return obj.data.slice(pricesLength - histBalancesLength)
    }
    else {
        return Array((histBalancesLength) - pricesLength).concat(obj.data)
    }
}
// TODO: Rethink the current try catch approach
export const getValuesForHistoricalDates = createSelector(
    getBalancesForAllDates,
    state => state.prices,
    (balances, prices) => {
        if (prices.loading || !prices.initialized || !balances) return false

        const relevantPrices = mapValues(arraysFixLength(balances), pickKeysExcept(['loading', 'initialized'])(prices))
        const relevantBalances = balances.slice(0, balances.length - 1)
        const calcValue = (obj, prices, type, i) => map(obj, (val, key) => {
            try { return val * (key === 'USD' ? 1 : prices[key][i][type]) }
            catch (err) {
                return 0
            }
        }
        )
        const valueAt = (type, coins, i) => flow(calcValue, sum)(coins, relevantPrices, type, i)

        const coinValues = relevantBalances.map((o, i) => ({
            time: o.date,
            close: valueAt('close', o.coins, i),
        }))

        return coinValues
    }
)

export const getValueDaysAgo = createCachedSelector(
    (state, days) => days,
    getValuesForHistoricalDates,
    (days, values) => values[values.length - days + 1] // +1 since current day is not incorporated currently in the historical data
)(
    (state, days) => days
)

export const getValueFirstDay = createSelector(
    getValuesForHistoricalDates,
    (values) => values[0]
)

export const getCoinsCurrentBalances = createSelector(
    getBalances,
    (balances) => get('currentBalance.coins', balances)
)

export const balanceTableData = createSelector(
    getAllTickers,
    getCoinsCurrentBalances,
    generateCurrentValues
)

export const getTotalValue = createSelector(
    balanceTableData,
    data => reduce((res, obj) => res + obj.value, 0, data),
)

export const getFormattedTotalValue = createSelector(
    getTotalValue,
    num => flow(
        num => round(num, 2),
        num => `${num} USD`
    )(num)
)

export const getFormattedTotalBTC = createSelector(
    getTotalValue,
    state => getTicker(state, 'BTC'),
    (num, ticker) => flow(
        (num, ticker) => num / ticker,
        num => round(num, 2),
        num => `${num} BTC`
    )(num, ticker)
)
export const getExchangesCurrentBalances = createSelector(
    getBalances,
    (balances) => get('currentBalance.exchanges', balances)
)