import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import _ from 'lodash'
import StylePercent from 'common/utils/StylePercent'
import round from 'common/utils/round'
import { padDecimal } from 'common/utils/padNumber'
import { fetchTicker } from 'common/bitcoinPrices/bitcoinTickerActions'

// const fetchOldPrice = async (days, timeframe='1d', limit=1) => {
//     const ohlcv = await exchange.fetchOHLCV('BTC/USD', timeframe, stampDaysAgo(days), limit)
//     return (ohlcv[0][1] + ohlcv[0][4]) / 2
// }
const price = (arr) => {
    const avg = _.sum(arr) / arr.length
    const res = avg ? avg : 0
    return padDecimal(round(res, 2), 2)
}

export class CurrentBitcoinPrice extends Component {
    static propTypes = {
        //prop: PropTypes
    }

    componentDidMount() {
        this.props.fetchTicker()
        setInterval(this.props.fetchTicker, 60000)
    }

    render() {
        let {ticker, previous} = _.pick(this.props.data, ['ticker', 'previous'])
        previous = _.flatten(previous)
        const currentPrice = price(_.values(_.pick(ticker, ['bid', 'ask'])))
        const previousPrice = price([_.nth(previous, 1), _.nth(previous, 4)])
        const bothPrices = currentPrice & previousPrice
        const dayChange = bothPrices && ((previousPrice - currentPrice) / previousPrice)
        
        return (
            <TextPane
                title="Current Bitcoin price:"
                botLeft={`${currentPrice} USD`}
                topRight={<span>1d: <StylePercent value={dayChange || 0.001} /></span>}
                botRight=" "
                loading={!ticker && this.props.loading}
                loadingMessage="Loading current Bitcoin price"
            />
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.bitcoinTicker.loading,
    data: state.bitcoinTicker.data,
})

const mapDispatchToProps = (dispatch) => ({
    fetchTicker: () => dispatch(fetchTicker())
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBitcoinPrice)
