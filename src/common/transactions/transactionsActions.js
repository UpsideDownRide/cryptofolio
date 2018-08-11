import { database } from 'common/firebase/interface'
import {
    SUBMIT_REDUX_TRANSACTION,
    SUBMIT_DATABASE_TRANSACTION_BEGIN,
    SUBMIT_DATABASE_TRANSACTION_SUCCESS,
    SUBMIT_DATABASE_TRANSACTION_ERROR,
    RETRIEVE_TRANSACTIONS_BEGIN,
    RETRIEVE_TRANSACTIONS_SUCCESS,
    RETRIEVE_TRANSACTIONS_ERROR
} from './transactionsReducer'


export const retrieveTransactions = uid => dispatch => {
    dispatch(retrieveTransactionsBegin())
    return database.getTransactions(uid)
        .then(result => dispatch(retrieveTransactionsSuccess(result.val())))
        .catch(error => dispatch(retrieveTransactionsError(error)))
}

export const submitTransaction = (transaction, isLoggedIn, uid) => dispatch => {
    if (!isLoggedIn) {
        return Promise.resolve(dispatch(submitTransactionToStore(transaction)))
    }
    else {
        dispatch(submitTransactionDatabaseBegin())
        return database.submitTransaction(uid, transaction)
            .then(() => dispatch(submitTransactionDatabaseSuccess()))
            .then(transaction => dispatch(submitTransactionToStore(transaction)))
            .catch(error => dispatch(submitTransactionDatabaseError(error)))
    }
}

const submitTransactionToStore = (transaction) => ({
    type: SUBMIT_REDUX_TRANSACTION,
    payload: { transaction: transaction }
})

const submitTransactionDatabaseBegin = () => ({
    type: SUBMIT_DATABASE_TRANSACTION_BEGIN
})

const submitTransactionDatabaseSuccess = () => ({
    type: SUBMIT_DATABASE_TRANSACTION_SUCCESS,
})

const submitTransactionDatabaseError = (error) => ({
    type: SUBMIT_DATABASE_TRANSACTION_ERROR,
    payload: { error: error }
})

const retrieveTransactionsBegin = () => ({
    type: RETRIEVE_TRANSACTIONS_BEGIN
})

const retrieveTransactionsSuccess = (transactions) => ({
    type: RETRIEVE_TRANSACTIONS_SUCCESS,
    payload: { transactions: transactions }
})

const retrieveTransactionsError = (error) => ({
    type: RETRIEVE_TRANSACTIONS_ERROR,
    payload: { error: error }
})