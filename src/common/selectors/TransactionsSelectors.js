import { createSelector } from 'reselect'
import { map, pick, partial, minBy, maxBy, get, getOr, set, flow, has, add, subtract } from 'lodash/fp'
const getTransactionsData = state => state.transactions.data

export const getTransactions = createSelector(
    getTransactionsData,
    transactions => transactions
)

const extractCurrencies = (res, el) => res.add(...map('currency', pick(['in.currency', 'out.currency', 'fee.currency'], el)))

export const getCurrencies = createSelector(
    getTransactions,
    (data) => [...data.reduce(extractCurrencies, new Set())],
)

const ifHasKey = (updateType, el, keyFrom, operation) => acc => has(keyFrom, el) ? updateType(el, keyFrom, operation, acc) : acc
const updateCurrency = (el, keyFrom, operation, acc) => update(el[keyFrom].currency, el[keyFrom].value, operation, acc)
const updateExchange = (el, keyFrom, operation, acc) => update(`${el[keyFrom].exchange}.${el[keyFrom].currency}`, el[keyFrom].value, operation, acc)
const update = (keyTo, previousValue, operation, acc) => set(keyTo, operation(getOr(0, keyTo, acc), previousValue), acc)

const conditional = (updateType) => (acc, el) => {
    const ifHasKeyUpdate = partial(ifHasKey, [updateType, el]) 
    return flow(
        ifHasKeyUpdate('in', add),
        ifHasKeyUpdate('out', subtract),
        ifHasKeyUpdate('fee', subtract)
    )(acc)
}

export const getCoinBalances = createSelector(
    getTransactions,
    (transactions) => transactions.reduce(conditional(updateCurrency), {})
)

export const getExchangesBalances = createSelector(
    getTransactions,
    (transactions) => transactions.reduce(conditional(updateExchange), {})
)

export const getFirstTransaction = createSelector(
    getTransactions,
    transactions => flow(
        arr => minBy(o => o.date, arr),
        obj => get('date', obj)
    )(transactions)
)

export const getLastTransaction = createSelector(
    getTransactions,
    transactions => flow(
        arr => maxBy(o => o.date, arr),
        obj => get('date', obj)
    )(transactions)
)
