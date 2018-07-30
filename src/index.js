import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css'
import App from './scenes/App';
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import addTransaction from 'scenes/Transactions/AddTransaction/AddTransactionReducer'
import balanceData from 'common/mockData/balances'
import balanceSettings from 'scenes/Dashboard/BalanceTablePane/BalanceTableColumnSettings'

const balance = (state, action) => ({
    data: balanceData,
    settings: balanceSettings
})


const rootReducer = combineReducers({
    balance,
    transactions: addTransaction,
})

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
