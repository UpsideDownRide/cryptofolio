import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import _ from 'lodash'
import StylePercent from 'common/utils/StylePercent'
import round from 'common/utils/round'
import { padDecimal } from 'common/utils/padNumber'

const price = (arr) => {
    const avg = _.sum(arr) / arr.length
    const res = avg ? avg : 0
    return padDecimal(round(res, 2), 2)
}

export const CurrentBitcoinPrice = (props) => {
    let { ticker, previous } = _.pick(props.data, ['ticker', 'previous'])
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
            botRight="HH:mm:ss"
            loading={!ticker && props.loading}
            loadingMessage="Loading current Bitcoin price"
        />
    )
}

const mapStateToProps = (state) => ({
    loading: state.bitcoinTicker.loading,
    data: state.bitcoinTicker.data,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBitcoinPrice)
