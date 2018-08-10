import { database } from './firebase'

//TODO: Sanity check for non existance of the uid we are trying to create

export const createUser = uid => {
    return Promise.all(
        [
            database.ref(`transactions/${uid}`).set({ data: false }),
            database.ref(`users/${uid}`).set({ settings: false }),
        ]
    )
}

export const getTransactions = uid => {
    return database.ref(`transactions/${uid}`).once('value')
}