import createReducer from 'common/utils/createReducer'

export const FETCH_PRICES_BEGIN = 'FETCH_PRICES_BEGIN'
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS'
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR'

const initialState = {
    prices: null, // Expected to be array
    loading: false,
    error: null,
}

const actions = {
    FETCH_PRICES_BEGIN: (state) => ({ ...state, loading: true, error: null }),
    FETCH_PRICES_SUCCESS: (state, action) => ({ ...state, loading: false, prices: action.payload.prices }),
    FETCH_PRICES_ERROR: (state, action) => ({ ...state, loading: false, error: action.payload.error }),
}

export default createReducer(initialState, actions)
