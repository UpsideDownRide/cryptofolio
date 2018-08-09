import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { createSelector } from 'reselect';
import { getExchangesCurrentBalances } from 'common/selectors/BalancesSelectors';
import { getAllTickers } from 'common/cryptoPrices/tickersSelector';
import _ from 'lodash'
import TreeMap from 'components/Charts/TreeMap/TreeMap'

const ExchangeTreeMap = ({ data, ...props }) => (
    <GraphPane
        title="Portfolio by exchange"
    >
        {data.length > 0 && <TreeMap data={data} {...props} />}
    </GraphPane>
)

const graphData = createSelector(
    getExchangesCurrentBalances,
    getAllTickers,
    (balances, tickers) => _(balances)
                            .mapValues((exchange) => _(exchange)
                                .reduce((res, value, key) => res + value * _.get(tickers, key), 0))
                            .map((value, exchange) => ({name: exchange, size:value}))
                            .sort((a, b) => b.size - a.size)
                            .value() 
)

const mapStateToProps = (state) => ({
    data: graphData(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeTreeMap)
