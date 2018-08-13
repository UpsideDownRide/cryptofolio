import { set, sortedIndexBy, slice } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'
import transactionData from 'common/mockData/transactions'

export const DELETE_REDUX_TRANSACTION = 'DELETE_REDUX_TRANSACTION'
export const SUBMIT_REDUX_TRANSACTIONS = 'SUBMIT_REDUX_TRANSACTIONS'
export const RETRIEVE_TRANSACTIONS_BEGIN = 'RETRIEVE_TRANSACTIONS_BEGIN'
export const RETRIEVE_TRANSACTIONS_SUCCESS = 'RETRIEVE_TRANSACTIONS_SUCCESS'
export const RETRIEVE_TRANSACTIONS_ERROR = 'RETRIEVE_TRANSACTIONS_ERROR'
export const SUBMIT_DATABASE_TRANSACTION_BEGIN = 'SUBMIT_DATABASE_TRANSACTION_BEGIN'
export const SUBMIT_DATABASE_TRANSACTION_SUCCESS = 'SUBMIT_DATABASE_TRANSACTION_SUCCESS' 
export const SUBMIT_DATABASE_TRANSACTION_ERROR = 'SUBMIT_DATABASE_TRANSACTION_ERROR' 
export const DELETE_DATABASE_TRANSACTION_BEGIN = 'DELETE_DATABASE_TRANSACTION_BEGIN'
export const DELETE_DATABASE_TRANSACTION_SUCCESS = 'DELETE_DATABASE_TRANSACTION_SUCCESS' 
export const DELETE_DATABASE_TRANSACTION_ERROR = 'DELETE_DATABASE_TRANSACTION_ERROR' 

const initialState = {
    data: transactionData,
    areLoading: false,
    isSubmitting: false
}
// This is n log n but we are currently merging sorted arrays so can be imporved to O(n) if need be
const addMultipleTransactions = (state, action) => {
    const updatedData = state.data.concat(action.payload.transactions).sort((a,b) => a.date - b.date)
    return {...state, data: updatedData}
}

const addSingleTransaction = (state, action) => {
    const transaction = action.payload.transactions[0]
    const insertIndex = sortedIndexBy('date', transaction, state.data)
    const updatedData = [...slice(0, insertIndex, state.data),
                        transaction,
                        ...slice(insertIndex, state.data.length, state.data)]
    return set('data', updatedData, state)
}

const addTransactionToStore = (state, action) => {
    const transLength = action.payload.transactions.length
    return transLength > 1 ? addMultipleTransactions(state, action) : addSingleTransaction(state, action)
}

const deleteTransactionFromStore = (state, action) => ({...state, data: state.data.filter(row => row.key !== action.payload.key)})

const actions = {
    DELETE_REDUX_TRANSACTION: deleteTransactionFromStore,
    SUBMIT_REDUX_TRANSACTIONS: addTransactionToStore,
    SUBMIT_DATABASE_TRANSACTION_BEGIN: state => ({...state, isSubmitting: true}),
    SUBMIT_DATABASE_TRANSACTION_SUCCESS: state => ({...state, isSubmitting: false}),
    SUBMIT_DATABASE_TRANSACTION_ERROR: (state, action) => ({...state, isSubmitting: false, submitError: action.payload.error}),
    DELETE_DATABASE_TRANSACTION_BEGIN: state => ({...state, isSubmitting: true}),
    DELETE_DATABASE_TRANSACTION_SUCCESS: state => ({...state, isSubmitting: false}),
    DELETE_DATABASE_TRANSACTION_ERROR: (state, action) => ({...state, isSubmitting: false, submitError: action.payload.error}),
    RETRIEVE_TRANSACTIONS_BEGIN: state => ({...state, areLoading: true}),
    RETRIEVE_TRANSACTIONS_SUCCESS: (state, action) => ({...state, areLoading: false, ...action.payload.transactions}),
    RETRIEVE_TRANSACTIONS_ERROR: (state, action) => ({...state, areLoading: false, error: action.payload.error}),
}

export default createReducer(initialState, actions)
