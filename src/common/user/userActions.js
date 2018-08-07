import { CREATE_USER_SUCCESS, CREATE_USER_FAILURE, LOGIN_USER, LOGOUT_USER } from './userReducer'

export const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    user,
})

export const createUserFailure = (error) => ({
    type: CREATE_USER_FAILURE,
    error
})

export const loginUser = (user) => ({
    type: LOGIN_USER,
    user
})

export const logoutUser = () => ({
    type: LOGOUT_USER
})