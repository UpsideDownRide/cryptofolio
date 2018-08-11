import { database } from './firebase'

//TODO: Sanity check for non existance of the uid we are trying to create

export const createUser = uid => {
    const setTransactions = database.ref(`transactions/${uid}`).set({ data: false })
    const setUsers = database.ref(`users/${uid}`).set({ settings: false })
    return Promise.all([setTransactions, setUsers])
}

export const getTransactions = uid => {
    return database.ref(`transactions/${uid}`).once('value')
}

export const submitTransaction = (uid, transaction) => {
    return database.ref(`transactions/${uid}`).push().set(transaction)
}