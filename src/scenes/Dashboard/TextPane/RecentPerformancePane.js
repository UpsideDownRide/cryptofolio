import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { getTotalValue, getValueDaysAgo } from 'common/selectors/BalancesSelectors'
import { round } from 'lodash'
import { getOr } from 'lodash/fp'
import StylePercent from 'common/utils/StylePercent'

const RecentPerformancePane = ({ totalValue, valueWeekAgo, ...props }) => {
    const absoluteChange = totalValue - getOr(0, 'close', valueWeekAgo)
    const percentageChange = absoluteChange / getOr(1, 'close', valueWeekAgo)
    
    return (
        <TextPane
            title="Recent performance"
            botLeft={`${round(absoluteChange, 2)} USD`}
            botRight="7d change"
            topRight={<StylePercent value={round(percentageChange, 4)} />}
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    totalValue: getTotalValue(state),
    valueWeekAgo: getValueDaysAgo(state, 7),
})

export default connect(mapStateToProps)(RecentPerformancePane)
