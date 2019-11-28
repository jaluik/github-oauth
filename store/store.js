import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const userInitialState = {}

function userReducer(state = userInitialState, action) {
    switch (action.type) {
        default:
            return state
    }
}

const reducers = combineReducers({
    user: userReducer,
})

export default state => {
    const store = createStore(
        reducers,
        {
            user: userInitialState,
            ...state,
        },
        composeWithDevTools(applyMiddleware(ReduxThunk))
    )
    return store
}
