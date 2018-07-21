import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css'
import App from './scenes/App';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'components/Reducer'
import balanceData from 'common/mockData/balances'
import balanceSettings from 'scenes/Dashboard/BalanceTablePane/BalanceTableColumnSettings'
import transactionData from 'common/mockData/transactions'
import transactionSettings from 'scenes/Portfolio/TransactionTable/TransactionTableSettings'

const initialState = {
    balance: {
        data: balanceData,
        settings: balanceSettings
    },
    transactions: {
        data: transactionData,
        settings: transactionSettings
    }
}

const store = createStore(reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
