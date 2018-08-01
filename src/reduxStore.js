import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import addTransaction from 'scenes/Transactions/AddTransaction/AddTransactionReducer'
import balanceData from 'common/mockData/balances'
import thunk from 'redux-thunk'
import prices from 'common/cryptoPrices/pricesReducer'
import tickers from 'common/cryptoPrices/tickersReducer'

const balance = (state, action) => ({
    data: balanceData
})

const rootReducer = combineReducers({
    balance,
    transactions: addTransaction,
    prices,
    tickers
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))