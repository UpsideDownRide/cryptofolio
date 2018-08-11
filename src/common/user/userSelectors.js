import { createSelector } from 'reselect'
import { getOr } from 'lodash/fp'

export const isUserLoggedIn = createSelector(
    state => state.user.isLoggedIn,
    (bool) => bool
)

export const getUserUID = createSelector(
    state => getOr(false, 'user.uid', state),
    (string) => string
)