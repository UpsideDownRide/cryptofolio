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

const ifHasKey = (updateType, el, keyFrom, operation) => acc => has(el, keyFrom) ? updateType(el, keyFrom, operation, acc) : acc
const updateCurrency = (el, keyFrom, operation, acc) => update(el[keyFrom].currency, el[keyFrom].value, operation, acc)
const updateExchange = (el, keyFrom, operation, acc) => update(`${el[keyFrom].exchange}.${el[keyFrom].currency}`, el[keyFrom].value, operation, acc)
const update = (keyTo, previousValue, operation, acc) => set(acc, keyTo, operation(get(acc, keyTo, 0), previousValue))

const conditional = (updateType) => (acc, el) => (
    flow(
        ifHasKey(updateType, el, 'in', add),
        ifHasKey(updateType, el, 'out', subtract),
        ifHasKey(updateType, el, 'fee', subtract)
    )(acc)
)

export const getCoinBalances = createSelector(
    getTransactions,
    (transactions) => transactions.reduce(conditional(updateCurrency), {})
)

export const getExchangesBalances = createSelector(
    getTransactions,
    (transactions) => transactions.reduce(conditional(updateExchange), {})
)
