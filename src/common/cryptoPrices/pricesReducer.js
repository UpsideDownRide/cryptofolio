import createReducer from 'common/utils/createReducer'
import { set, flow } from 'lodash/fp'

export const FETCH_PRICES_BEGIN = 'FETCH_PRICES_BEGIN'
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS'
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR'

const initialState = {
    loading: false
}

const fetchSuccess = (state, action) => ({ ...state, loading: false, ...action.payload })
const fetchBegin = (state, action) => flow(
    set('loading', true),
    set(`${action.payload.baseCurrency}.isLoading`, true),
    set(`${action.payload.baseCurrency}.error`, null)
)(state)

const actions = {
    FETCH_PRICES_BEGIN: fetchBegin,
    FETCH_PRICES_SUCCESS: fetchSuccess,
    FETCH_PRICES_ERROR: (state, action) => ({ ...state, loading: false, error: action.payload.error }),
}

export default createReducer(initialState, actions)
