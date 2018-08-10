import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { getValuesForHistoricalDates } from 'common/selectors/BalancesSelectors'
import { arePricesLoading } from 'common/cryptoPrices/pricesSelector'
import LineChart from 'components/Charts/Line/LineChart'
import { Segment } from 'semantic-ui-react'

const PortfolioValueGraph = ({ prices, loading, data, ...props }) => {
    return (
        <GraphPane 
            title="Portfolio value in USD"
            loading={loading}
            loadingMessage="Loading historical prices"
            {...props}
        >
            {data && <LineChart data={data} {...props} />}
            {!data && <Segment>Enter transaction</Segment>}
        </GraphPane>
    )
}

const mapStateToProps = (state) => ({
    data: getValuesForHistoricalDates(state),
    loading: arePricesLoading(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioValueGraph)