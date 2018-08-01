import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import moment from 'moment'
import { arePricesLoading, getPricesBTC } from 'common/cryptoPrices/pricesSelector'

const parse = (prices) => prices.map(el => ({
    name: moment(el[0]).format('DD MMM'),
    open: el[1],
    high: el[2],
    low: el[3],
    close: el[4],
    volume: el[5]
}))

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = prices 
    return (
        <GraphPane chart="area"
            name="Bitcoin price last 30 days"
            data={data}
            loading={loading}
            loadingMessage="Loading historical Bitcoin prices"
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    prices: getPricesBTC(state),
    loading: arePricesLoading(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinPriceGraph)
