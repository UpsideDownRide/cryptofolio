import { set, sortedIndexBy, slice } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'
import transactionData from 'common/mockData/transactions'

export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION'
export const RETRIEVE_TRANSACTIONS_BEGIN = 'RETRIEVE_TRANSACTIONS_BEGIN'
export const RETRIEVE_TRANSACTIONS_SUCCESS = 'RETRIEVE_TRANSACTIONS_SUCCESS'
export const RETRIEVE_TRANSACTIONS_ERROR = 'RETRIEVE_TRANSACTIONS_ERROR'

const initialState = {
    data: transactionData,
    areLoading: false,
}

const addTransaction = (state, action) => {
    const insertIndex = sortedIndexBy('date', action.payload.transaction, state.data)
    const updatedData = [...slice(0, insertIndex, state.data),
                        action.payload.transaction,
                        ...slice(insertIndex, state.data.length, state.data)]
    return set('data', updatedData, state)
}

const actions = {
    SUBMIT_TRANSACTION: addTransaction,
    RETRIEVE_TRANSACTIONS_BEGIN: state => ({...state, areLoading: true}),
    RETRIEVE_TRANSACTIONS_SUCCESS: (state, action) => ({...state, areLoading: false, ...action.payload.transactions}),
    RETRIEVE_TRANSACTIONS_ERROR: (state, action) => ({...state, areLoading: false, error: action.payload.error}),
}

export default createReducer(initialState, actions)
