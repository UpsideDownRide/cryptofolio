import { createSelector } from 'reselect'
import { pick, map, flow, add, subtract, get, set, has } from 'lodash'

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

const ifHasKeyUpdateCurrency = (el, key, operation) => acc => has(el, key) ? set(acc, el[key].currency, operation(get(acc, el[key].currency, 0), el[key].value)) : acc

const transactionsReducer = (acc, el) => (
    flow(
        ifHasKeyUpdateCurrency(el, 'in', add),
        ifHasKeyUpdateCurrency(el, 'out', subtract),
        ifHasKeyUpdateCurrency(el, 'fee', subtract)
    )(acc)
)

export const getCoinBalances = createSelector(
    getTransactions,
    (transactions) => transactions.reduce(transactionsReducer, {})
)
