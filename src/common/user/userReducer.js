import { set, flow, partial } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'

export const CREATE_USER_BEGIN = 'CREATE_USER_BEGIN'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER_BEGIN = 'LOGOUT_USER_BEGIN'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE'

const initialState = {
    isLoggedIn: false
}

const loginUser = (state, action) => flow(
    partial(set, ['isLoggedIn', true]),
    partial(set, ['uid', action.payload.uid])
)(state)

const logoutUser = () => (initialState)

// TODO: Investigate why state does not get changed on failures
const actions = {
    CREATE_USER_BEGIN: (state) => state,
    CREATE_USER_SUCCESS: loginUser,
    CREATE_USER_ERROR: (state, action) => ({ ...state, createUserError: action.payload.error }),
    LOGIN_USER_BEGIN: (state) => state,
    LOGIN_USER_SUCCESS: loginUser,
    LOGIN_USER_FAILURE: (state, action) => ({ ...state, loginUserError: action.payload.error }),
    LOGOUT_USER_BEGIN: (state) => state,
    LOGOUT_USER_SUCCESS: logoutUser,
    LOGOUT_USER_FAILURE: (state, action) => ({ ...state, logoutUserError: action.payload.error }),
}

export default createReducer(initialState, actions)