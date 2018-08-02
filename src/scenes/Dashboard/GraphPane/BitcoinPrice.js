import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { arePricesLoading, getPricesBTC } from 'common/cryptoPrices/pricesSelector'

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = prices 
    return (
        <GraphPane chart="line"
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
