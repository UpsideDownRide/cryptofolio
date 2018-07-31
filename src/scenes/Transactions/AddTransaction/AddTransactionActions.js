import { SUBMIT_TRANSACTION } from './AddTransactionReducer'

export const submitTransaction = (transaction) => ({
    type: SUBMIT_TRANSACTION,
    transaction: transaction
})