import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import ccxt from 'ccxt'
import moment from 'moment'
import _ from 'lodash/fp'
import StylePercent from 'common/utils/StylePercent'
import round from 'common/utils/round'

const exchange = new ccxt.kraken()
exchange.proxy = 'https://cors-anywhere.herokuapp.com/'

const fetchPrices = async () => {
    const ticker = await exchange.fetchTicker('BTC/USD')
    const current =  (ticker.ask + ticker.bid) / 2
    return round(current, 2)
}

const fetchOldPrice = async (days, timeframe='1d', limit=1) => {
    const ohlcv = await exchange.fetchOHLCV('BTC/USD', timeframe, stampDaysAgo(days), limit)
    return (ohlcv[0][1] + ohlcv[0][4]) / 2
}

const stampDaysAgo = (num) => moment().seconds(0).milliseconds(0).subtract(num*24, 'hours').valueOf()

export class CurrentBitcoinPrice extends Component {
    
    static propTypes = {
        //prop: PropTypes
    }

    state = { loading: true }
    
    setStateAsync = (state) => {
        return new Promise((res) => this.setState(state, res))
    }

    getPrice = async () => {
        const currentPrice = await fetchPrices()
        const dayAgoPrice = await fetchOldPrice(1)
        const priceTime = moment().format('HH:mm:ss')
        await this.setStateAsync({ prices: {current: currentPrice, dayAgo: dayAgoPrice}, priceTime: priceTime, loading: false })
    }

    componentDidMount() {
        this.getPrice()
        setInterval(this.getPrice, 60000)
    }

    render() {
        const currentPrice = _.getOr("???", "prices.current", this.state)
        const dayChange = this.state.prices && ((this.state.prices.dayAgo - currentPrice) / this.state.prices.dayAgo)
        return (
            <TextPane
                title="Current Bitcoin price:"
                botLeft={`${currentPrice} USD`}
                topRight={<span>1d: <StylePercent value={dayChange || 0.001} /></span>}
                botRight={this.state.priceTime || "HH:MM:SS"}
                loading={this.state.loading}
                loadingMessage="Loading current Bitcoin price"
            />
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBitcoinPrice)
