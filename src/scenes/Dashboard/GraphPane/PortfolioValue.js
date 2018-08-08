import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { arePricesLoading, getPricesOf } from 'common/cryptoPrices/pricesSelector'

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = prices 
    return (
        <GraphPane chart="line"
            name="Portfolio value"
            data={data}
            loading={loading}
            loadingMessage="Loading historical prices"
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    prices: getPricesOf(state, 'BTC'),
    loading: arePricesLoading(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinPriceGraph)