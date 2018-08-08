import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { balanceTableData } from 'common/selectors/BalanceTableSelectors'
import { createSelector } from 'reselect'
import { flow, reduce, round, partialRight } from 'lodash'
import { getTicker } from 'common/cryptoPrices/tickersSelector';

const TotalValuePane = ({ totalValue, totalValueBTC, ...props }) => (
    <TextPane title="Total value of coins"
        botLeft={totalValue}
        botRight={totalValueBTC}
        {...props} />
)

const getTotalValue = createSelector(
    balanceTableData,
    data => reduce(data, (res, obj) => res + obj.value, 0),
)

const getFormattedTotalValue = createSelector(
    getTotalValue,
    num => flow(
        num => round(num, 2),
        num => `${num} USD`
    )(num)
)

const getFormattedTotalBTC = createSelector(
    getTotalValue,
    partialRight(getTicker, 'BTC'),
    (num, ticker) => flow(
        (num, ticker) => num / ticker,
        num => round(num, 2),
        num => `${num} BTC`
    )(num, ticker) 
)

const mapStateToProps = (state) => ({
    totalValue: getFormattedTotalValue(state),
    totalValueBTC: getFormattedTotalBTC(state)
})

export default connect(mapStateToProps)(TotalValuePane)
