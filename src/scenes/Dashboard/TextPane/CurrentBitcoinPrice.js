import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import StylePercent from 'common/utils/StylePercent'
import round from 'common/utils/round'
import { padDecimal } from 'common/utils/padNumber'
import { areTickersLoading, getTickerBTC } from 'common/cryptoPrices/tickersSelector';


export const CurrentBitcoinPrice = ({loading, tickerBTC}) => {
    const displayTicker = padDecimal(round(tickerBTC, 2), 2)
    //const bothPrices = tickerBTC & previousPrice
    //const dayChange = bothPrices && ((tickerBTC - previousPrice) / previousPrice)

    return (
        <TextPane
            title="Current Bitcoin price:"
            botLeft={`${displayTicker} USD`}
            topRight={<span>1d: <StylePercent value={0.001} /></span>}
            botRight="HH:mm:ss"
            loading={!tickerBTC && loading}
            loadingMessage="Loading current Bitcoin price"
        />
    )
}

const mapStateToProps = (state) => ({
    loading: areTickersLoading(state),
    tickerBTC: getTickerBTC(state),
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBitcoinPrice)
