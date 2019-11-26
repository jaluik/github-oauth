import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

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

export function add(num) {
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

export default state => {
    const store = createStore(
        reducers,
        {
            count: initialState,
            user: userInitialState,
            ...state,
        },
        composeWithDevTools(applyMiddleware(ReduxThunk))
    )
    return store
}
