import createReducer from 'common/utils/createReducer'

export const FETCH_TICKER_BEGIN = 'FETCH_TICKER_BEGIN'
export const FETCH_TICKER_SUCCESS = 'FETCH_TICKER_SUCCESS'
export const FETCH_TICKER_ERROR = 'FETCH_TICKER_ERROR'

const initialState = {
    data: null,
    loading: false,
    error: null
}

const actions = {
    FETCH_TICKER_BEGIN: (state) => ({ ...state, loading: true, error: null }),
    FETCH_TICKER_SUCCESS: (state, action) => ({ ...state, loading: false, data: action.payload.data }),
    FETCH_TICKER_ERROR: (state, action) => ({ ...state, loading: false, error: action.payload.error })
}

export default createReducer(initialState, actions)
