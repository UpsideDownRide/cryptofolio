import { createSelector } from 'reselect'
import { map, pick, minBy, maxBy, get, getOr, flow, values } from 'lodash/fp'
import dayjs from 'dayjs'

const getTransactionsData = state => getOr(false, 'transactions.data', state)
const extractCurrencies = (res, el) => {
    map('currency', pick(['in.currency', 'out.currency', 'fee.currency'], el))
        .forEach(currency => res.add(currency))
    return res
}
const countTrades = transactions => transactions.reduce((res, el) => el.operation === 'Trade' ? res + 1 : res, 0)
const countCoins = transactions => {
    const currenciesSet = transactions.reduce((res, el) => {
        if (el.operation !== 'Trade') return res
        flow(
            pick(['in.currency', 'out.currency']),
            values,
            map('currency'),
            currencies => currencies.forEach(curr => res.add(curr))
        )(el)
        return res
    }, new Set())
    return currenciesSet.size
}

const offsetTZ = Number(dayjs().format('Z').split(':')[0])
const startOfLastMonth = dayjs().subtract(1, 'month').startOf('month').add(offsetTZ, 'hour').valueOf()
const endOfLastMonth = dayjs(startOfLastMonth).endOf('month').add(offsetTZ, 'hour').valueOf()

export const getTransactions = createSelector(
    getTransactionsData,
    transactions => transactions
)

export const getCurrencies = createSelector(
    getTransactions,
    transactions => {
        if (!transactions) return ['BTC']
        else return [...transactions.reduce(extractCurrencies, new Set())]
    },
)

export const getFirstTransactionDate = createSelector(
    getTransactions,
    transactions => flow(
        arr => minBy(o => o.date, arr),
        obj => get('date', obj)
    )(transactions)
)

export const getLastTransactionDate = createSelector(
    getTransactions,
    transactions => flow(
        arr => maxBy(o => o.date, arr),
        obj => get('date', obj)
    )(transactions)
)

export const getAllTrades = createSelector(
    getTransactions,
    countTrades
)

export const getAllTradeCoins = createSelector(
    getTransactions,
    countCoins
)

export const getTransactionsLastMonth = createSelector(
    getTransactions,
    transactions => transactions.filter(transaction =>
        transaction.date >= startOfLastMonth && transaction.date <= endOfLastMonth
    )
)

export const getTradesLastMonth = createSelector(
    getTransactionsLastMonth,
    countTrades
)

export const getCoinsLastMonth = createSelector(
    getTransactionsLastMonth,
    countCoins
)