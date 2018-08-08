import {
    FETCH_PRICES_BEGIN,
    FETCH_PRICES_SUCCESS,
    FETCH_PRICES_ERROR,
} from './pricesReducer'
import { set } from 'lodash'

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

export const fetchPrices = (baseCurrency) => dispatch => {
    const quoteCurrency = 'USD'
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${baseCurrency}&tsym=${quoteCurrency}&allData=true`
    dispatch(fetchPricesBegin())
    fetch(url)
        .then(response => response.json())
        .then(result => set({}, baseCurrency, result.Data))
        .then(data => dispatch(fetchPricesSuccess(data)))
        .catch(error => dispatch(fetchPricesError(error)))
}

export const fetchPricesBegin = () => ({
    type: FETCH_PRICES_BEGIN
})

export const fetchPricesSuccess = data => ({
    type: FETCH_PRICES_SUCCESS,
    payload: { data }
})

export const fetchPricesError = error => ({
    type: FETCH_PRICES_ERROR,
    payload: { error }
})


