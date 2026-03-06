import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const initialState = {
    myFavorites: [],
    user: null,
    token: null,
    isLoading: false,
    error: null
}

// Restaurar desde localStorage si existe
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : initialState

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
)

// Guardar estado en localStorage cuando cambie
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store