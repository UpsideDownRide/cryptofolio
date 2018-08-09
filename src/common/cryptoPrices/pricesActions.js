import {
    FETCH_PRICES_BEGIN,
    FETCH_PRICES_SUCCESS,
    FETCH_PRICES_ERROR,
    FETCH_ALL_PRICES_BEGIN,
    FETCH_ALL_PRICES_SUCCESS,
    FETCH_ALL_PRICES_ERROR,
} from './pricesReducer'
import { set, get, flow } from 'lodash/fp'

// For reference if needs to be used

// const sleep = ms => new Promise(r => setTimeout(r, ms));

// const retryOperation = (delay, times, exchange, operation, ...args) => new Promise((resolve, reject) => {
//     return exchange[operation](...args)
//         .then(resolve)
//         .catch((reason) => {
//             return times === 1 ? reject(reason) :
//                 sleep(delay)
//                     .then(retryOperation.bind(null, delay, times - 1, exchange, operation, ...args))
//                     .then(resolve)
//                     .catch(reject)
//         })
// })

export const fetchPrices = (currencies) => dispatch => {
    Promise.all(currencies.map(el => dispatch(fetchPricesOf(el))))
        .then(dispatch(fetchAllPricesSuccess()))
        .catch(dispatch(fetchAllPricesError()))
}

export const fetchPricesOf = (baseCurrency) => dispatch => {
    const quoteCurrency = 'USD'
    if (baseCurrency === quoteCurrency) return false
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${baseCurrency}&tsym=${quoteCurrency}&allData=true`
    dispatch(fetchPricesBegin(baseCurrency))
    fetch(url)
        .then(response => response.json())
        .then(result => get('Data', result))
        .then(data => dispatch(fetchPricesSuccess(data, baseCurrency, quoteCurrency)))
        .catch(error => dispatch(fetchPricesError(error, baseCurrency)))
}

export const fetchAllPricesBegin = () => ({
    type: FETCH_ALL_PRICES_BEGIN
})

export const fetchAllPricesSuccess = () => ({
    type: FETCH_ALL_PRICES_SUCCESS
})

export const fetchAllPricesError = () => ({
    type: FETCH_ALL_PRICES_ERROR
})

export const fetchPricesBegin = (baseCurrency) => ({
    type: FETCH_PRICES_BEGIN,
    payload: {baseCurrency: baseCurrency}
})

export const fetchPricesSuccess = (data, baseCurrency, quoteCurrency) => ({
    type: FETCH_PRICES_SUCCESS,
    payload: flow(
        set(`${baseCurrency}.isLoading`, false),
        set(`${baseCurrency}.quoteCurrency`, quoteCurrency),
        set(`${baseCurrency}.data`, data)
    )({})
})

export const fetchPricesError = (error, baseCurrency) => ({
    type: FETCH_PRICES_ERROR,
    payload: flow(
        set(`${baseCurrency}.isLoading`, false),
        set(`${baseCurrency}.error`, error)
    )({})
})


