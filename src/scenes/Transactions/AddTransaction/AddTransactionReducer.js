import { set, concat } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'
import transactionData from 'common/mockData/transactions'
import transactionSettings from '../TransactionTable/TransactionTableSettings'

const initialState = {
    data: transactionData,
    settings: transactionSettings
}

const addTransaction = (state, action) => (
    set('data', concat(state.data, action.transaction), state)
)

export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION'

const actions = {
    SUBMIT_TRANSACTION: addTransaction
}

export default createReducer(initialState, actions)
