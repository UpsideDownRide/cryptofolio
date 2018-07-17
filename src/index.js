import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css'
import App from './scenes/Home/App';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'components/Reducer'
import balanceData from 'common/mockData/balanceTable'
import balanceSettings from 'scenes/Home/Dashboard/components/BalanceTablePane/BalanceTableColumnSettings'

const initialState = {
    "balanceData": balanceData,
    balanceTableColumnSettings: balanceSettings,

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
