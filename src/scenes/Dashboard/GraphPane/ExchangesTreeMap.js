import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GraphPane from './GraphPane'
import { createSelector } from 'reselect';
import { getExchangesBalances } from 'common/selectors/TransactionsSelectors';
import { getAllTickers } from 'common/cryptoPrices/tickersSelector';
import _ from 'lodash'

const ExchangeTreeMap = ({ data, ...props }) => (
    data.length > 0 ? <GraphPane name="Portfolio by exchange" chart="treeMap" data={data} {...props} /> : null
)

const graphData = createSelector(
    getExchangesBalances,
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
