import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { getFormattedTotalValue, getFormattedTotalBTC } from 'common/selectors/BalancesSelectors'

const PortfolioPerformancePane = ({ totalValue, totalValueBTC, ...props }) => (
    <TextPane
        title="Portfolio value"
        botLeft={totalValue}
        botRight={totalValueBTC}
        {...props}
    />
)

const mapStateToProps = (state) => ({
    totalValue: getFormattedTotalValue(state),
    totalValueBTC: getFormattedTotalBTC(state)
})

export default connect(mapStateToProps)(PortfolioPerformancePane)
