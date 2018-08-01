import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BalanceTablePane from './BalanceTablePane'
import _ from 'lodash'
// TODO: There is no point in having a container and pane they should be merged. 

const BalanceTableContainer = ({ tickers, data, transactions, ...props }) => {
    const coinBalances = calculateCoinBalances(transactions)
    const updatedData = !tickers ? data : _.map(coinBalances, (val, key) => ({currency: key, amount: val, price: tickers[key], trend: 0, value: tickers[key] * val}))
    return (
        <BalanceTablePane data={updatedData} {...props} />
    )
}

const ifHasKeyUpdateCurrency = (el, key, operation) => acc => _.has(el, key) ? _.set(acc, el[key].currency, operation(_.get(acc, el[key].currency, 0), el[key].value)) : acc

const transactionsReducer = (acc, el) => (
    _.flow(
        ifHasKeyUpdateCurrency(el, 'in', _.add),
        ifHasKeyUpdateCurrency(el, 'out', _.subtract),
        ifHasKeyUpdateCurrency(el, 'fee', _.subtract)
    )(acc)
)

const calculateCoinBalances = (transactions) => transactions.reduce(transactionsReducer, {})

const mapStateToProps = (state) => ({
    data: state.balance.data,
    columnSettings: state.balance.settings,
    tickers: _.get(state.tickers, 'data'),
    transactions: state.transactions.data
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTableContainer)

