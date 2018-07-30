import ccxt from 'ccxt'
import moment from 'moment'
import { FETCH_PRICES_BEGIN, FETCH_PRICES_SUCCESS, FETCH_PRICES_ERROR } from './bitcoinPricesReducer'

const exchange = new ccxt.kraken()
exchange.proxy = 'https://cors-anywhere.herokuapp.com/'
const stampDaysAgo = (num) => moment().seconds(0).milliseconds(0).subtract(num * 24, 'hours').valueOf()

export const fetchPrices = () => dispatch => {
    dispatch(fetchPricesBegin())
    exchange
        .fetchOHLCV('BTC/USD', '1d', stampDaysAgo(30), 30)
        .then(result => dispatch(fetchPricesSuccess(result)))
        .catch(error => dispatch(fetchPricesError(error)))
}

export const fetchPricesBegin = () => ({
    type: FETCH_PRICES_BEGIN
})

export const fetchPricesSuccess = prices => ({
    type: FETCH_PRICES_SUCCESS,
    payload: { prices }
})

export const fetchPricesError = error => ({
    type: FETCH_PRICES_ERROR,
    payload: { error }
})