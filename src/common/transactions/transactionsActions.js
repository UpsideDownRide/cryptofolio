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

export const retrieveTransactionsBegin = () => ({
    type: RETRIEVE_TRANSACTIONS_BEGIN
})

export const retrieveTransactionsSuccess = (transactions) => ({
    type: RETRIEVE_TRANSACTIONS_SUCCESS,
    payload: {transactions: transactions}
})

export const retrieveTransactionsError = (error) => ({
    type: RETRIEVE_TRANSACTIONS_ERROR,
    payload: {error: error}
})

export const submitTransaction = (transaction) => ({
    type: SUBMIT_TRANSACTION,
    transaction: transaction
})