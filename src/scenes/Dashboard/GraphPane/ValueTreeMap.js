import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { balanceTableData } from 'common/selectors/BalanceTableSelectors'
import { createSelector } from 'reselect';

const ValueTreeMap = ({ data, ...props }) => (
    data.length > 0 ? <GraphPane name="Currencies share in portfolio" chart="treeMap" data={data} {...props} /> : null
)

const graphData = createSelector(
    balanceTableData,
    (data) => data.map(el => ({ name: el.currency, size: el.value }))
                .filter(el => el.size > 0)
                .sort((a, b) => b.size - a.size)
)

const mapStateToProps = (state) => ({
    data: graphData(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ValueTreeMap)
