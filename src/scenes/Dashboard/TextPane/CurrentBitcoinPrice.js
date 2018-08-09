import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import round from 'common/utils/round'
import { padDecimal } from 'common/utils/padNumber'
import { areTickersLoading, getTicker } from 'common/cryptoPrices/tickersSelector';


export const CurrentBitcoinPrice = ({loading, tickerBTC}) => {
    const displayTicker = padDecimal(round(tickerBTC, 2), 2)

    return (
        <TextPane
            title="Current Bitcoin price"
            botLeft={`${displayTicker} USD`}
            loading={!tickerBTC && loading}
            loadingMessage="Loading current Bitcoin price"
        />
    )
}

CurrentBitcoinPrice.propTypes = {
    loading: PropTypes.bool,
    tickerBTC: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    loading: areTickersLoading(state),
    tickerBTC: getTicker(state, 'BTC'),
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBitcoinPrice)
