import _ from 'lodash/fp'

const addTransaction = (state, action) => (
    _.set('transactions.data', _.concat(state.transactions.data, action.transaction), state)
)

const actions = {
    SUBMIT_TRANSACTION: addTransaction 
}

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

export default createReducer({}, actions)
