import { createSelector } from 'reselect'
import { get } from 'lodash'

const getTickersLoading = state => state.tickers.loading
const getBTCticker = state => get(state, 'tickers.data.BTC', 0)

export const areTickersLoading = createSelector(
    getTickersLoading,
    (loading) => loading
)

export const tickerBTC = createSelector(
    getBTCticker,
    (price) => price
)
