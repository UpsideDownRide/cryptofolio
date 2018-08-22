import { set, get, flow, filter } from 'lodash/fp'
import Bottleneck from 'bottleneck'
import {
    FETCH_PRICES_BEGIN,
    FETCH_PRICES_SUCCESS,
    FETCH_PRICES_ERROR,
    FETCH_ALL_PRICES_BEGIN,
    FETCH_ALL_PRICES_SUCCESS,
    FETCH_ALL_PRICES_ERROR,
} from './pricesReducer'

const limiter = new Bottleneck({
    maxConcurrent: 3,
    minTime: 400,
})

export const fetchPrices = (currencies) => dispatch => {
    dispatch(fetchAllPricesBegin())
    const filteredCurrencies = filter(s => s !== 'USD', currencies)
    Promise.all(filteredCurrencies.map(el => dispatch(fetchPricesOf(el))))
        .then(() => dispatch(fetchAllPricesSuccess()))
        .catch(error => dispatch(fetchAllPricesError(error)))
}

// TODO: add guard if we receive error response

export const fetchPricesOf = (baseCurrency) => dispatch => {
    const quoteCurrency = 'USD'
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${baseCurrency}&tsym=${quoteCurrency}&allData=true`
    dispatch(fetchPricesBegin(baseCurrency))
    return limiter.schedule(() => fetch(url))
        .then(response => response.json())
        .then(result => get('Data', result))
        .then(data => data.map(el => ({ ...el, time: el.time * 1000 })))
        .then(data => dispatch(fetchPricesSuccess(data, baseCurrency, quoteCurrency)))
        .catch(error => dispatch(fetchPricesError(error, baseCurrency)))
}

const fetchAllPricesBegin = () => ({
    type: FETCH_ALL_PRICES_BEGIN
})

const fetchAllPricesSuccess = () => ({
    type: FETCH_ALL_PRICES_SUCCESS
})

const fetchAllPricesError = (error) => ({
    type: FETCH_ALL_PRICES_ERROR,
    payload: { error: error }
})

const fetchPricesBegin = (baseCurrency) => ({
    type: FETCH_PRICES_BEGIN,
    payload: { baseCurrency: baseCurrency }
})

const fetchPricesSuccess = (data, baseCurrency, quoteCurrency) => ({
    type: FETCH_PRICES_SUCCESS,
    payload: flow(
        set(`${baseCurrency}.isLoading`, false),
        set(`${baseCurrency}.quoteCurrency`, quoteCurrency),
        set(`${baseCurrency}.data`, data)
    )({})
})

const fetchPricesError = (error, baseCurrency) => ({
    type: FETCH_PRICES_ERROR,
    payload: flow(
        set(`${baseCurrency}.isLoading`, false),
        set(`${baseCurrency}.error`, error)
    )({})
})


