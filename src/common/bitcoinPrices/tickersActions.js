import moment from 'moment'
import _ from 'lodash'
import {
    FETCH_TICKER_BEGIN,
    FETCH_TICKER_SUCCESS,
    FETCH_TICKER_ERROR,
} from './tickersReducer'

const stampDaysAgo = (num) => moment().seconds(0).milliseconds(0).subtract(num * 24, 'hours').valueOf()

const cryptocompare = 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USD,JPY,EUR'

export const fetchTicker = () => dispatch => {
    dispatch(fetchTickerBegin())
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USD,ETH,BTC`)
        .then(response => response.json())
        .then(result => _.mapValues(result, e => 1/e)) 
        .then(result => dispatch(fetchTickerSuccess(result)))
        .catch(error => dispatch(fetchTickerError(error)))
}

//const ticker = tickers['BTC']
//const previous = await exchange.fetchOHLCV('BTC/USD', '5m', stampDaysAgo(1), 1)

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