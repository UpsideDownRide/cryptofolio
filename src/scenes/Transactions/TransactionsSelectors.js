import { createSelector } from 'reselect'
import { pick, map } from 'lodash'

const getTransactionsData = state => state.transactions.data

export const getTransactions = createSelector(
    getTransactionsData,
    transactions => transactions
)

const extractCurrencies = (res, el) => res.add(...map(pick(el, ['in.currency', 'out.currency', 'fee.currency']), 'currency'))

export const getCurrencies = createSelector(
    getTransactions,
    (data) => [...data.reduce(extractCurrencies, new Set())],
)
