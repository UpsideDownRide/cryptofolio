import { createSelector } from 'reselect'
import { get } from 'lodash'

const tickersLoading = state => state.tickers.loading
const tickersData = state => state.tickers.data
const tickerBTC = state => get(state, 'tickers.data.BTC', 0)

export const areTickersLoading = createSelector(
    tickersLoading,
    (loading) => loading
)

export const getAllTickers = createSelector(
    tickersData,
    (data) => data
)

export const getTickerBTC = createSelector(
    tickerBTC,
    (price) => price
)
