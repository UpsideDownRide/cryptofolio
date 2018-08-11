import { database } from './firebase'

//TODO: Sanity check for non existance of the uid we are trying to create

export const createUser = uuid => {
    const setTransactions = database.ref(`transactions/${uuid}`).set({ data: false })
    const setUsers = database.ref(`users/${uuid}`).set({ settings: false })
    return Promise.all([setTransactions, setUsers])
}

export const getTransactions = uuid => {
    return database.ref(`transactions/${uuid}/data`).once('value')
}

export const submitTransaction = (uuid, transaction, key) => {
    return database.ref(`transactions/${uuid}/data/${key}`).set(transaction)
}