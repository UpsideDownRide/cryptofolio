import createReducer from 'common/utils/createReducer'
import { set, flow } from 'lodash/fp'

export const FETCH_PRICES_BEGIN = 'FETCH_PRICES_BEGIN'
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS'
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR'
export const FETCH_ALL_PRICES_BEGIN = 'FETCH_ALL_PRICES_BEGIN'
export const FETCH_ALL_PRICES_SUCCESS = 'FETCH_ALL_PRICES_SUCCESS'
export const FETCH_ALL_PRICES_ERROR = 'FETCH_ALL_PRICES_ERROR'

const initialState = {
    loading: false
}

const fetchSuccess = (state, action) => ({ ...state, ...action.payload })
const fetchBegin = (state, action) => flow(
    set(`${action.payload.baseCurrency}.isLoading`, true),
    set(`${action.payload.baseCurrency}.error`, null)
)(state)

const actions = {
    FETCH_PRICES_BEGIN: fetchBegin,
    FETCH_PRICES_SUCCESS: fetchSuccess,
    FETCH_PRICES_ERROR: (state, action) => ({ ...state, error: action.payload.error }),
    FETCH_ALL_PRICES_BEGIN: (state) => ({...state, loading: true}),
    FETCH_ALL_PRICES_SUCCESS: (state) => ({...state, loading: false}),
    FETCH_ALL_PRICES_ERROR: (state) => ({...state, loading: false}),
}

export default createReducer(initialState, actions)
