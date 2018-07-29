import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransactionForm from './finalform'
import { SYMBOLS as _SYMBOLS } from 'common/mockData/currencies'
import moment from 'moment'

const formValues = {
    INITIAL_VALUES: { "date": moment().format('LLL') },
    SYMBOLS: _SYMBOLS.map(el => ({ key: el, value: el, text: el })),
    EXCHANGES: ["Binance", "Coinbase", "GDAX"].map(el => ({ key: el, value: el, text: el })),
    TRANSACTIONS: ["Buy", "Sell", "Transfer", "Deposit", "Withdraw", "Mining"].map(el => ({ key: el, value: el, text: el }))
}

class AddTransaction extends Component {
    render() {
        return (
            <React.Fragment>
                <TransactionForm
                    formValues={formValues}
                    subscription={{ submitting: true, pristine: true }}
                    {...this.props}/>
            </React.Fragment>
        )
    }
}

const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION'

const submitTransaction = (transaction) => ({
    type: SUBMIT_TRANSACTION,
    transaction: transaction
})

const mapDispatchToProps = dispatch => ({
    submitRedux: (transaction) => dispatch(submitTransaction(transaction))
})

const dispatchLink = connect(() => ({}), mapDispatchToProps)(AddTransaction)

export default dispatchLink