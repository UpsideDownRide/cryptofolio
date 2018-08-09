import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { getValuesForHistoricalDates } from 'common/selectors/BalancesSelectors'
import LineChart from 'components/Charts/Line/LineChart'

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = props.balances
    return (
        <GraphPane 
            title="Portfolio value"
            loading={!data}
            loadingMessage="Loading historical prices"
            {...props}
        >
            {data && <LineChart data={data} {...props} />}
        </GraphPane>
    )
}

const mapStateToProps = (state) => ({
    balances: getValuesForHistoricalDates(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinPriceGraph)