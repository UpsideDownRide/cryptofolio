import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { arePricesLoading, get30DaysPrices } from 'common/cryptoPrices/pricesSelector'
import LineChart from 'components/Charts/Line/LineChart'

const BitcoinPriceGraph = ({ data, loading, ...props }) => (
    <GraphPane
        title="Bitcoin price last 30 days"
        loading={loading}
        loadingMessage="Loading historical Bitcoin prices"
    >
        {data && data.length && <LineChart data={data} {...props} />}
    </GraphPane>
)


const mapStateToProps = (state) => ({
    data: get30DaysPrices(state, 'BTC'),
    loading: arePricesLoading(state),
})

export default connect(mapStateToProps)(BitcoinPriceGraph)