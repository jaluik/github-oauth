import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const userInitialState = {}

const LOGOUT = 'LOGOUT'
function userReducer(state = userInitialState, action) {
    switch (action.type) {
        case LOGOUT:
            return {}
        default:
            return state
    }
}

const reducers = combineReducers({
    user: userReducer,
})

// action creators
export function logout() {
    return dispatch => {
        axios
            .post('/logout')
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: LOGOUT,
                    })
                } else {
                    console.log('logout failed', res)
                }
            })
            .catch(err => {
                console.log('logout failed', err)
            })
    }
}

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
