import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import prices from 'common/cryptoPrices/pricesReducer'
import tickers from 'common/cryptoPrices/tickersReducer'
import transactions from 'common/transactions/transactionsReducer'
import user from 'common/user/userReducer'

const rootReducer = combineReducers({
    transactions,
    prices,
    tickers,
    user
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))