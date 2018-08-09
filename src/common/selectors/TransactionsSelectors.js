import { createSelector } from 'reselect'
import { map, pick, minBy, maxBy, get, getOr, flow } from 'lodash/fp'

const getTransactionsData = state => getOr(false, 'transactions.data', state)
const extractCurrencies = (res, el) => res.add(...map('currency', pick(['in.currency', 'out.currency', 'fee.currency'], el)))

export const getTransactions = createSelector(
    getTransactionsData,
    transactions => transactions
)

export const getCurrencies = createSelector(
    getTransactions,
    transactions => [...transactions.reduce(extractCurrencies, new Set())],
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