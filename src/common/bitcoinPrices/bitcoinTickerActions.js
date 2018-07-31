import ccxt from 'ccxt'
import moment from 'moment'
import {
    FETCH_TICKER_BEGIN,
    FETCH_TICKER_SUCCESS,
    FETCH_TICKER_ERROR,
} from './bitcoinTickerReducer'

const exchange = new ccxt.kraken()
exchange.proxy = 'https://cors-anywhere.herokuapp.com/'
const stampDaysAgo = (num) => moment().seconds(0).milliseconds(0).subtract(num * 24, 'hours').valueOf()

export const fetchTicker = () => dispatch => {
    dispatch(fetchTickerBegin())
    getTickerAndPrevious()
        .then(result => dispatch(fetchTickerSuccess(result)))
        .catch(error => dispatch(fetchTickerError(error)))
}

const getTickerAndPrevious = async () => {
    const tickers = await exchange.fetchTickers()
    const ticker = tickers['BTC/USD']
    //const ticker = await exchange.fetchTicker('BTC/USD')
    const previous = await exchange.fetchOHLCV('BTC/USD', '5m', stampDaysAgo(1), 1)
    return {tickers: tickers, ticker: ticker, previous: previous}
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