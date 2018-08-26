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

// TODO: Improve performance, app is slow to load initially, possible ideas - vendor chunks, optimize the bundle size, optimize the semantic to include only what we use, use webpack dashboard
// TODO: Add more proptypes
// TODO: Choose testing library (jest probably?) and write tests
// TODO: Leverage composing of css modules
// TODO: Rethink the usage of semantic

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
