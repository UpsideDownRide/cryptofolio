import React from 'react'
import { connect } from 'react-redux'
import AddTransactionForm from './AddTransactionForm'
import { SYMBOLS as _SYMBOLS } from 'common/mockData/currencies'
import moment from 'moment'
import CurrencyIcon from 'common/utils/CurrencyIcon'
import { submitTransaction } from './AddTransactionActions'

const formValues = {
    INITIAL_VALUES: { "date": moment().toISOString(), "time": moment().format("HH:mm:ss") },
    SYMBOLS: _SYMBOLS.map(el => ({ key: el, value: el, text: <span><CurrencyIcon name={el} />{el}</span> })),
    EXCHANGES: ["Binance", "Coinbase", "GDAX", "Kraken"].map(el => ({ key: el, value: el, text: el })),
    TRANSACTIONS: ["Trade", "Transfer", "Deposit", "Withdraw", "Mining"].map(el => ({ key: el, value: el, text: el }))
}

const AddTransaction = (props) => (
    <AddTransactionForm
        formValues={formValues}
        subscription={{ submitting: true, pristine: true }}
        {...props}
    />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    submitRedux: (transaction) => dispatch(submitTransaction(transaction))
})

const dispatchLink = connect(mapStateToProps, mapDispatchToProps)(AddTransaction)

export default dispatchLink