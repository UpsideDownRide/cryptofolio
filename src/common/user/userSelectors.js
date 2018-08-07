import { createSelector } from 'reselect'

const isLoggedIn = state => state.user.isLoggedIn
const userUID = state => state.user.uid

export const isUserLoggedIn = createSelector(
    isLoggedIn,
    (bool) => bool
)

export const getUserUID = createSelector(
    userUID,
    (string) => string
)