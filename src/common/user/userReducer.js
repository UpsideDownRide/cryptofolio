import { set, flow, partial } from 'lodash/fp'
import createReducer from 'common/utils/createReducer'

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

const initialState = {
    isLoggedIn: false
}

const loginUser = (state, action) => flow(
    partial(set, ['isLoggedIn', true]),
    partial(set, ['uid', action.user.uid])
)(state)

const actions = {
    CREATE_USER_SUCCESS: loginUser
}

export default createReducer(initialState, actions)