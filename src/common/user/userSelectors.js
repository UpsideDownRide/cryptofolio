import { createSelector } from 'reselect'
import { getOr } from 'lodash/fp'

const isLoggedIn = state => state.user.isLoggedIn
const userUID = state => getOr(false, 'user.uid', state)

export const isUserLoggedIn = createSelector(
    isLoggedIn,
    (bool) => bool
)

export const getUserUID = createSelector(
    userUID,
    (string) => string
)