import { auth, database } from 'common/firebase/interface'
import { retrieveTransactions, loadDefaultTransactions } from 'common/transactions/transactionsActions'
import {
    CREATE_USER_BEGIN,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
} from './userReducer'

export const createUser = (email, password) => dispatch => {
    dispatch(createUserBegin())
    const user = auth.createUser(email, password)
    const db = user.then(result => database.createUser(result.user.uid))
    return Promise.all([user, db])
        .then(([resolvedUser, db]) => {
            dispatch(createUserSuccess(resolvedUser.user.uid))
            dispatch(retrieveTransactions(resolvedUser.user.uid))
        })
        .catch(error => dispatch(createUserFailure(error)))

}

export const loginUser = (email, password) => dispatch => {
    dispatch(loginUserBegin())
    return auth.signIn(email, password)
        .then(result => {
            return dispatch(retrieveTransactions(result.user.uid))
                .then(() => dispatch(loginUserSuccess(result.user.uid)))
                .catch(error => dispatch(loginUserFailure(error)))
        })
        
}

export const logoutUser = () => dispatch => {
    dispatch(logoutUserBegin())
    return auth.signOut()
        .then(() => {
            dispatch(loadDefaultTransactions())
            dispatch(logoutUserSuccess())
        })
        .catch(error => dispatch(logoutUserFailure(error)))
}

const createUserBegin = () => ({
    type: CREATE_USER_BEGIN
})

const createUserSuccess = (uid) => ({
    type: CREATE_USER_SUCCESS,
    payload: { uid: uid },
})

const createUserFailure = (error) => ({
    type: CREATE_USER_FAILURE,
    payload: { error: error }
})

const loginUserBegin = () => ({
    type: LOGIN_USER_BEGIN,
})

const loginUserSuccess = (uid) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { uid: uid }
})

const loginUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: { error: error }
})

const logoutUserBegin = () => ({
    type: LOGOUT_USER_BEGIN
})

const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS
})

const logoutUserFailure = (error) => ({
    type: LOGOUT_USER_FAILURE,
    payload: { error: error }
})
