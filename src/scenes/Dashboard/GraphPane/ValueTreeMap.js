import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { balanceTableData } from 'common/selectors/BalancesSelectors'
import { createSelector } from 'reselect'
import TreeMap from 'components/Charts/TreeMap/TreeMap'


const ValueTreeMap = ({ data, ...props }) => (
    <GraphPane
        title="Portfolio by currencies"
    >
        {data.length > 0 && <TreeMap data={data} {...props} />}
    </GraphPane>
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

export default connect(mapStateToProps)(ValueTreeMap)
