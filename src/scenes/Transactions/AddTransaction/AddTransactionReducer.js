import { set, concat } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'
import transactionData from 'common/mockData/transactions'


export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION'

const initialState = {
    data: transactionData,
}

const addTransaction = (state, action) => (
    set('data', concat(state.data, action.transaction), state)
)

const actions = {
    SUBMIT_TRANSACTION: addTransaction
}

export default createReducer(initialState, actions)
