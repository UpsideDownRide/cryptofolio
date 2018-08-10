import { 
    SUBMIT_TRANSACTION,
    RETRIEVE_TRANSACTIONS_BEGIN,
    RETRIEVE_TRANSACTIONS_SUCCESS,
    RETRIEVE_TRANSACTIONS_ERROR
} from './transactionsReducer'

import { database } from 'common/firebase/interface'

export const retrieveTransactions = uid => dispatch => {
    dispatch(retrieveTransactionsBegin())
    database.getTransactions(uid)
        .then(result => dispatch(retrieveTransactionsSuccess(result.val())))
        .catch(error => dispatch(retrieveTransactionsError(error)))
}

export const submitTransaction = (transaction, isLoggedIn, uid) => dispatch => ({
    type: SUBMIT_TRANSACTION,
    payload: {transaction: transaction}
})

// const submitTransactionDatabaseBegin = () => ({
//     type: SUBMIT_DATABASE_TRANSACTION_BEGIN
// })

// const submitTransactionDatabaseSuccess = (transactions) => ({
//     type: SUBMIT_DATABASE_TRANSACTION_SUCCESS,
//     payload: {transactions: transactions}
// })

// const submitTransactionDatabaseError = (error) => ({
//     type: SUBMIT_DATABASE_TRANSACTION_ERROR,
//     payload: {error: error}
// })

const retrieveTransactionsBegin = () => ({
    type: RETRIEVE_TRANSACTIONS_BEGIN
})

const retrieveTransactionsSuccess = (transactions) => ({
    type: RETRIEVE_TRANSACTIONS_SUCCESS,
    payload: {transactions: transactions}
})

const retrieveTransactionsError = (error) => ({
    type: RETRIEVE_TRANSACTIONS_ERROR,
    payload: {error: error}
})
