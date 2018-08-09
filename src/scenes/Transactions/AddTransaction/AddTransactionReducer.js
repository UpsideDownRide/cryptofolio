import { set, sortedIndexBy, slice } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'
import transactionData from 'common/mockData/transactions'

export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION'

const initialState = {
    data: transactionData,
}

const addTransaction = (state, action) => {
    const insertIndex = sortedIndexBy('date', action.transaction, state.data)
    const updatedData = [...slice(0, insertIndex, state.data),
                        action.transaction,
                        ...slice(insertIndex, state.data.length, state.data)]
    return set('data', updatedData, state)
}

const actions = {
    SUBMIT_TRANSACTION: addTransaction
}

export default createReducer(initialState, actions)
