import ccxt from 'ccxt'
import moment from 'moment'
import {
    FETCH_PRICES_BEGIN,
    FETCH_PRICES_SUCCESS,
    FETCH_PRICES_ERROR,
} from './pricesReducer'

const exchange = new ccxt.kraken()
exchange.proxy = 'https://cors-anywhere.herokuapp.com/'
const stampDaysAgo = (num) => moment().seconds(0).milliseconds(0).subtract(num * 24, 'hours').valueOf()
const sleep = ms => new Promise(r => setTimeout(r, ms));

const retryOperation = (delay, times, exchange, operation, ...args) => new Promise((resolve, reject) => {
    return exchange[operation](...args)
        .then(resolve)
        .catch((reason) => {
            return times === 1 ? reject(reason) :
                sleep(delay)
                    .then(retryOperation.bind(null, delay, times - 1, exchange, operation, ...args))
                    .then(resolve)
                    .catch(reject)
        })
})

export const fetchPrices = (times = 30, delay = 10000) => dispatch => {
    dispatch(fetchPricesBegin())
    retryOperation(delay, times, exchange, 'fetchOHLCV', 'BTC/USD', '1d', stampDaysAgo(30), 30)
        .then(result => dispatch(fetchPricesSuccess(result)))
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


