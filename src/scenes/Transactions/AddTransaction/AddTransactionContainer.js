import React from 'react'
import { connect } from 'react-redux'
import AddTransactionForm from './AddTransactionForm'
import { SYMBOLS } from 'common/mockData/currencies'
import dayjs from 'dayjs'
import CurrencyIcon from 'common/utils/CurrencyIcon'
import { submitTransactions } from 'common/transactions/transactionsActions'
import { isUserLoggedIn, getUserUID } from 'common/user/userSelectors';

const formValues = {
    INITIAL_VALUES: { "date": dayjs().toISOString(), "time": dayjs().format("HH:mm:ss") },
    SYMBOLS: SYMBOLS.map(el => ({ key: el, value: el, text: <span><CurrencyIcon name={el} />{el}</span> })),
    EXCHANGES: ["Binance", "Coinbase", "GDAX", "Kraken"].map(el => ({ key: el, value: el, text: el })),
    TRANSACTIONS: ["Trade", "Transfer", "Deposit", "Withdraw", "Mining"].map(el => ({ key: el, value: el, text: el }))
}

const AddTransaction = ({ isLoggedIn, uid, submitTransactions, ...props }) => (
    <AddTransactionForm
        formValues={formValues}
        subscription={{ submitting: true, pristine: true }}
        submitTransactions={submitTransactions(isLoggedIn, uid)}
        {...props}
    />
)

const mapStateToProps = (state) => ({
    isLoggedIn: isUserLoggedIn(state),
    uid: getUserUID(state),
})

const mapDispatchToProps = dispatch => ({
    submitTransactions: (isLoggedIn, uid) => transactions => dispatch(submitTransactions(transactions, isLoggedIn, uid))
})

const dispatchLink = connect(mapStateToProps, mapDispatchToProps)(AddTransaction)

export default dispatchLink