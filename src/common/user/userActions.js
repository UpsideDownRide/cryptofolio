import { CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from './userReducer'

export const createUserSuccess = (user) => {
    return {
        type: CREATE_USER_SUCCESS,
        user,
    }
}

export const createUserFailure = (error) => {
    return {
        type: CREATE_USER_FAILURE,
        error
    }
}