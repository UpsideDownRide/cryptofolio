import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { arePricesLoading, get30DaysPrices } from 'common/cryptoPrices/pricesSelector'
import LineChart from 'components/Charts/Line/LineChart'

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = prices 
    return (
        <GraphPane 
            title="Bitcoin price last 30 days"
            loading={loading}
            loadingMessage="Loading historical Bitcoin prices"
        >
        {data && <LineChart data={data} {...props} />}
        </GraphPane>
    )
}

const mapStateToProps = (state) => ({
    prices: get30DaysPrices(state, 'BTC'),
    loading: arePricesLoading(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinPriceGraph)