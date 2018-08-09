import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { getTotalValue, getValueFirstDay } from 'common/selectors/BalancesSelectors'
import { round } from 'lodash'
import { getOr, partial } from 'lodash/fp'
import StylePercent from 'common/utils/StylePercent'
import moment from 'moment'

const TotalPerformancePane = ({ totalValue, firstValue, firstTransactionDate, ...props }) => {
    const absoluteChange = totalValue - getOr(0, 'close', firstValue)
    const percentageChange = absoluteChange / getOr(1, 'close', firstValue)
    
    return (
        <TextPane
            title="Total performance"
            botLeft={`${round(absoluteChange, 2)} USD`}
            botRight=" "
            topRight={<StylePercent value={round(percentageChange, 4)} />}
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    totalValue: getTotalValue(state),
    firstValue: getValueFirstDay(state),
})

export default connect(mapStateToProps)(TotalPerformancePane)
