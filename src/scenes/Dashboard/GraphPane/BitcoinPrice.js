import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import moment from 'moment'

const parse = (prices) => prices.map(el => ({
    name: moment(el[0]).format('DD MMM'),
    open: el[1],
    high: el[2],
    low: el[3],
    close: el[4],
    volume: el[5]
}))

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = prices && parse(prices)
    return (
        <GraphPane chart="area"
            name="Bitcoin price last 30 days"
            data={data}
            loading={loading}
            loadingMessage="Loading current Bitcoin price"
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    prices: state.prices.data,
    loading: state.prices.loading
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinPriceGraph)
