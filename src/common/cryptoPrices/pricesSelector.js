import { createSelector } from 'reselect'
import { get } from 'lodash'

const getPricesLoading = state => state.prices.loading
const getBTCprices = state => get(state, 'prices.data.BTC', false)

export const arePricesLoading = createSelector(
    getPricesLoading,
    (loading) => loading
)

export const getPricesBTC = createSelector(
    getBTCprices,
    (prices) => prices
)
