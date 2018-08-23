import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { getAllTrades, getAllTradeCoins } from 'common/transactions/transactionsSelectors';


export const TotalTrades = ({ allTrades, allTradeCoins }) => {
    return (
        <TextPane
            title="Total trades"
            botLeft={allTrades}
            botRight={`with ${allTradeCoins} currencies`}
        />
    )
}

TotalTrades.propTypes = {
    allTrades: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    allTrades: getAllTrades(state),
    allTradeCoins: getAllTradeCoins(state),
})

export default connect(mapStateToProps)(TotalTrades)
