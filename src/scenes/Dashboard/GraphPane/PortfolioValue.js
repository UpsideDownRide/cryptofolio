import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { getValuesForHistoricalDates } from 'common/selectors/BalancesSelectors';

const BitcoinPriceGraph = ({ prices, loading, ...props }) => {
    const data = props.balances
    return (
        <GraphPane chart="line"
            name="Portfolio value"
            data={data}
            loading={!data}
            loadingMessage="Loading historical prices"
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    balances: getValuesForHistoricalDates(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinPriceGraph)