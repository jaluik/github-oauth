import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const initialState = {
    count: 1,
}

const userInitialState = {
    name: 'jaluik',
}

const ADD = 'ADD'
function countReducer(state = initialState, action) {
    console.log(state, action)
    switch (action.type) {
        case ADD:
            return { count: state.count + (action.num || 1) }
        default:
            return state
    }
}

const USER_UPDATE = 'USER_UPDATE'
function userReducer(state = userInitialState, action) {
    switch (action.type) {
        case USER_UPDATE:
            return {
                ...state,
                name: action.name,
            }
        default:
            return state
    }
}

const reducers = combineReducers({
    count: countReducer,
    user: userReducer,
})

const store = createStore(
    reducers,
    {
        count: initialState,
        user: userInitialState,
    },
    applyMiddleware(ReduxThunk)
)

function add(num) {
    return {
        type: ADD,
        num,
    }
}

function addAsync(num) {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: ADD,
                num,
            })
        }, 5000)
    }
}

store.dispatch(add(3))

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(addAsync(4))

console.log(store.getState())

export default store
