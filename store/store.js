import { createStore } from 'redux'

const initialState = {
    count: 1,
}

const ADD = 'ADD'
function countReducer(state = initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case ADD:
            return state + 1
        default:
            return state
    }
}

const store = createStore(countReducer, initialState)

console.log(store)
console.log(store.getState())

store.dispatch({ type: ADD })

export default store
