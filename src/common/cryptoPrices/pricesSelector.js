import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { getOr, slice } from 'lodash/fp'

const getPricesLoading = state => state.prices.loading

export const arePricesLoading = createSelector(
    getPricesLoading,
    (loading) => loading
)

export const getPricesOf = createCachedSelector(
    (state, name) => getOr(false, `prices.data.${name}`, state),
    (prices) => prices 
)(
    (state, name) => name
)

export const get30DaysPrices = createCachedSelector(
    getPricesOf,
    (prices) => prices && slice(prices.length - 30, prices.length, prices) 
)(
    (state, name) => name
)
