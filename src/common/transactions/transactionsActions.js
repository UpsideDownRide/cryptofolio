import { database } from 'common/firebase/interface'
import { values, flow, orderBy } from 'lodash/fp'
import { map } from 'lodash'
import { key as firebaseKey } from 'firebase-key'
import {
    DELETE_REDUX_TRANSACTION,
    SUBMIT_REDUX_TRANSACTION,
    SUBMIT_DATABASE_TRANSACTION_BEGIN,
    SUBMIT_DATABASE_TRANSACTION_SUCCESS,
    SUBMIT_DATABASE_TRANSACTION_ERROR,
    DELETE_DATABASE_TRANSACTION_BEGIN,
    DELETE_DATABASE_TRANSACTION_SUCCESS,
    DELETE_DATABASE_TRANSACTION_ERROR,
    RETRIEVE_TRANSACTIONS_BEGIN,
    RETRIEVE_TRANSACTIONS_SUCCESS,
    RETRIEVE_TRANSACTIONS_ERROR
} from './transactionsReducer'


export const retrieveTransactions = uid => dispatch => {
    dispatch(retrieveTransactionsBegin())
    return database.getTransactions(uid)
        .then(result => flow(
            obj => map(obj, (val, key) => ({key: key, ...val})),
            values,
            orderBy(o => o.date, 'asc'),
            arr => ({ data: arr }),
            retrieveTransactionsSuccess,
            dispatch
        )(result.val()))
        .catch(error => dispatch(retrieveTransactionsError(error)))
}

export const submitTransaction = (transaction, isLoggedIn, uuid) => dispatch => {
    const key = firebaseKey(transaction.date)
    const keyedTransaction = { key: key, ...transaction }
    if (!isLoggedIn) {
        return Promise.resolve(dispatch(submitTransactionToStore(keyedTransaction)))
    }
    else {
        dispatch(submitTransactionDatabaseBegin())
        return database.submitTransaction(uuid, transaction, key)
            .then(() => dispatch(submitTransactionDatabaseSuccess()))
            .then(() => dispatch(submitTransactionToStore(keyedTransaction)))
            .catch(error => dispatch(submitTransactionDatabaseError(error)))
    }
}

export const deleteTransaction = (key, isLoggedIn, uuid) => dispatch => {
    if (!isLoggedIn) {
        return Promise.resolve(dispatch(deleteTransactionFromStore(key)))
    }
    else {
        dispatch(deleteTransactionDatabaseBegin())
        return database.deleteTransaction(uuid, key)
            .then(() => dispatch(deleteTransactionDatabaseSuccess()))
            .then(() => dispatch(deleteTransactionFromStore(key)))
            .catch(error => dispatch(deleteTransactionDatabaseError(error)))
    }
}

const deleteTransactionFromStore = key => ({
    type: DELETE_REDUX_TRANSACTION,
    payload: { key: key }
})

const submitTransactionToStore = (transaction) => ({
    type: SUBMIT_REDUX_TRANSACTION,
    payload: { transaction: transaction }
})

const deleteTransactionDatabaseBegin = () => ({
    type: DELETE_DATABASE_TRANSACTION_BEGIN
})

const deleteTransactionDatabaseSuccess = () => ({
    type: DELETE_DATABASE_TRANSACTION_SUCCESS,
})

const deleteTransactionDatabaseError = (error) => ({
    type: DELETE_DATABASE_TRANSACTION_ERROR,
    payload: { error: error }
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
