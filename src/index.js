import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './semantic/dist/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import App from './scenes/App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './reduxStore'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
