import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BalanceTablePane from './BalanceTablePane'
import _ from 'lodash'
import { getCoinBalances } from '../../Transactions/TransactionsSelectors'
import { getAllTickers } from 'common/cryptoPrices/tickersSelector'
// TODO: There is no point in having a container and pane they should be merged. 

const BalanceTableContainer = ({ tickers, coinBalances, ...props }) => {
    const data = tickers && _.map(coinBalances, (val, key) => ({ currency: key, amount: val, price: tickers[key], trend: 0, value: tickers[key] * val }))
    return (
        <React.Fragment>
            {data && <BalanceTablePane data={data} {...props} />}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    tickers: getAllTickers(state),
    coinBalances: getCoinBalances(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTableContainer)

