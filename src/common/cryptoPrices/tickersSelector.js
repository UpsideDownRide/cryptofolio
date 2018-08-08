import { createSelector } from 'reselect'
import { getOr } from 'lodash/fp'

const tickersLoading = state => state.tickers.loading
const tickersData = state => state.tickers.data
const ticker = (state, name) => getOr(0, `tickers.data.${name}`, state)

export const areTickersLoading = createSelector(
    tickersLoading,
    (loading) => loading
)

export const getAllTickers = createSelector(
    tickersData,
    (data) => data
)

export const getTicker = createSelector(
    ticker,
    (price) => price
)
