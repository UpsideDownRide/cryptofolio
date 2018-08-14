import { database } from './firebase'
import { set } from 'lodash/fp'

//TODO: Sanity check for non existance of the uid we are trying to create

export const createUser = uuid => {
    const setTransactions = database.ref(`transactions/${uuid}`).set({ data: false })
    const setUsers = database.ref(`users/${uuid}`).set({ settings: false })
    return Promise.all([setTransactions, setUsers])
}

export const getTransactions = uuid => {
    return database.ref(`transactions/${uuid}/data`).once('value')
}

export const submitTransactions = (uuid, transactions) => {
    const toDatabase = transactions.reduce((res, el) => {
        const { key, ...data } = el
        return set(key, data, res)
    }, {})
    // console.log(toDatabase)
    
    //return database.ref(`transactions/${uuid}/data/${key}`).set(transaction)
}

export const deleteTransaction = (uuid, key) => {
    return database.ref(`transactions/${uuid}/data/${key}`).set(null)
}
