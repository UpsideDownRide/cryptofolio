import { database } from './firebase'
import set from 'lodash/fp'

//TODO: Sanity check for non existance of the uid we are trying to create

export const createUser = uid => {
    database.ref(`transactions/${uid}`).set(
        { amount: 0 }
    )
    database.ref(`users/${uid}`).set(
        { settings: false }
    )
}