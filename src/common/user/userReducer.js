import { set, flow, partial } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_USER = 'LOGIN_USER'

const initialState = {
    isLoggedIn: false
}

const loginUser = (state, action) => flow(
    partial(set, ['isLoggedIn', true]),
    partial(set, ['uid', action.user.uid])
)(state)

const logoutUser = (state) => ({isLoggedIn: false})

const actions = {
    CREATE_USER_SUCCESS: loginUser,
    LOGOUT_USER: logoutUser,
    LOGIN_USER: loginUser,
}

export default createReducer(initialState, actions)