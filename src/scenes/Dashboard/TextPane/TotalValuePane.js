import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { balanceTableData } from 'common/selectors/BalanceTableSelectors'
import { createSelector } from 'reselect'
import { flow, reduce, round } from 'lodash'

const TotalValuePane = ({totalValue, ...props}) => <TextPane title="Total value of coins:" botLeft={totalValue} {...props} />

const getTotalValue = createSelector(
    balanceTableData,
    (data) => flow(
        data => reduce(data, (res, obj) => res+obj.value, 0),
        num => round(num, 2),
        num => `${num} USD`
    )(data)
)

const mapStateToProps = (state) => ({
    totalValue: getTotalValue(state)
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalValuePane)
