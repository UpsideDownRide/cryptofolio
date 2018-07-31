import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BalanceTablePane from './BalanceTablePane'
import _ from 'lodash'
import round from 'common/utils/round'
// TODO: There is no point in having a container and pane they should be merged. 

export const SYMBOLS = ['BCH', 'DASH', 'EOS', 'GNO', 'ETC', 'ETH', 'ICN', 'LTC', 'MLN', 'REP', 'USD', 'XDG', 'XLM', 'XMR', 'XRP', 'ZEC']
const needed = new Set(_.without(SYMBOLS, 'USD').map(el => `${el}/BTC`))
needed.add('BTC/USD')

const prices = (tickers) => {
    const rawPrices = _.values(_.pickBy(tickers, (v, k) => needed.has(k)))
                        .map(el => ({ ticker: el.symbol, price: (el.bid + el.ask) / 2 }))
    const btc = _.filter(rawPrices, el => el.ticker==="BTC/USD").map(el=>({"BTC": el.price}))[0]
    const rest = _.filter(rawPrices, el => el.ticker!=="BTC/USD").map(el=> _.set({}, el.ticker.replace(/\/BTC/, ''), el.price*btc.BTC))
    return _.reduce(rest, _.assign, {...btc, ...{"USD": 1}})
}

const BalanceTableContainer = ({ tickers, data, ...props }) => {
    const USDprices = tickers && tickers.data && prices(tickers.data.tickers)
    const updatedData = USDprices ? data.map(el => ({...el, price: round(USDprices[el.currency], 4), value: round(USDprices[el.currency] * el.amount, 4)})) : data
    return (
        <BalanceTablePane data={updatedData} {...props} />
    )
}

const mapStateToProps = (state) => ({
    data: state.balance.data,
    columnSettings: state.balance.settings,
    tickers: _.pick(state.bitcoinTicker, 'data.tickers')
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTableContainer)

