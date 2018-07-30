import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import addTransaction from 'scenes/Transactions/AddTransaction/AddTransactionReducer'
import balanceData from 'common/mockData/balances'
import balanceSettings from 'scenes/Dashboard/BalanceTablePane/BalanceTableColumnSettings'
import thunk from 'redux-thunk'
import bitcoinPrices from 'common/bitcoinPrices/bitcoinPricesReducer'

const balance = (state, action) => ({
    data: balanceData,
    settings: balanceSettings
})

const rootReducer = combineReducers({
    balance,
    transactions: addTransaction,
    bitcoinPrices
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))