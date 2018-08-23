import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextPane from './TextPane'
import { getTradesLastMonth, getCoinsLastMonth } from 'common/transactions/transactionsSelectors';

export const TradesLastMonth = ({ tradesLastMonth, coinsLastMonth }) => {
    return (
        <TextPane
            title="Trades last month"
            botLeft={tradesLastMonth}
            botRight={`with ${coinsLastMonth} currencies`}
        />
    )
}

TradesLastMonth.propTypes = {
    tradesLastMonth: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    tradesLastMonth: getTradesLastMonth(state),
    coinsLastMonth: getCoinsLastMonth(state),
})

export default connect(mapStateToProps)(TradesLastMonth)
