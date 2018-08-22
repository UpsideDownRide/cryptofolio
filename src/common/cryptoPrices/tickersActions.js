import { mapValues, union } from 'lodash'
import {
    FETCH_TICKER_BEGIN,
    FETCH_TICKER_SUCCESS,
    FETCH_TICKER_ERROR,
} from './tickersReducer'

export const fetchTicker = (currencies) => dispatch => {
    const quoteCurrencies = union(['BTC'], currencies).join(",")
    const baseCurrency = 'USD'
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${baseCurrency}&tsyms=${quoteCurrencies}`
    dispatch(fetchTickerBegin())
    fetch(url)
        .then(response => response.json())
        .then(result => mapValues(result, e => 1/e)) 
        .then(result => dispatch(fetchTickerSuccess(result)))
        .catch(error => dispatch(fetchTickerError(error)))
}

export const fetchTickerBegin = () => ({
    type: FETCH_TICKER_BEGIN
})

export const fetchTickerSuccess = data => ({
    type: FETCH_TICKER_SUCCESS,
    payload: { data }
})

export const fetchTickerError = error => ({
    type: FETCH_TICKER_ERROR,
    payload: { error }
})