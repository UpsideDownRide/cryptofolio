import { set, concat } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'
import transactionData from 'common/mockData/transactions'
import transactionSettings from '../TransactionTable/TransactionTableSettings'

export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION'

const initialState = {
    data: transactionData,
    settings: transactionSettings
}

const addTransaction = (state, action) => (
    set('data', concat(state.data, action.transaction), state)
)

const actions = {
    SUBMIT_TRANSACTION: addTransaction
}

export default createReducer(initialState, actions)
