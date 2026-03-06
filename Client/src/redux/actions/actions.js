import api from '../../utils/api'
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    ADD_FAV,
    REMOVE_FAV,
    FILTER_CARDS,
    ORDER_CARDS
} from './actions-types'

// Action creators simples
export const loginSuccess = (access, token, user) => ({
    type: LOGIN_SUCCESS,
    payload: { access, token, user }
})

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
})

export const logoutAction = () => ({
    type: LOGOUT
})

export const addFavSuccess = (favorites) => ({
    type: ADD_FAV,
    payload: favorites
})

export const removeFavSuccess = (id) => ({
    type: REMOVE_FAV,
    payload: id
})

// Actions con side effects (thunks)
// En actions.js:
export const login = (userData) => {
    return async (dispatch) => {
        try {
            console.log('Login action called with:', userData)
            const { data } = await api.post('/login', userData)
            console.log('Response from server:', data)

            const { access, token, user } = data
            console.log('Extracted:', { access, token, user })
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            dispatch(loginSuccess(access, token, user))

            return { success: true }
        } catch (error) {
            console.log('Login error:', error)
            const errorMessage = error.response?.data?.error || 'Login failed'
            dispatch(loginFailure(errorMessage))
            return { success: false, error: errorMessage }
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch(logoutAction())
    }
}

export const addFav = (character) => {
    return async (dispatch) => {
        try {
            const { data } = await api.post('/fav', character)
            dispatch(addFavSuccess(data))
        } catch (error) {
            console.error('Error adding favorite:', error)
        }
    }
}

export const removeFav = (id) => {
    return async (dispatch) => {
        try {
            await api.delete(`/fav/${id}`)
            dispatch(removeFavSuccess(id))
        } catch (error) {
            console.error('Error removing favorite:', error)
        }
    }
}

// Action de rehidratación
export const rehydrateAuth = () => {
    return (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const savedUser = JSON.parse(localStorage.getItem('user'))

            if (!token || !savedUser) {
                return { hasSession: false }
            }

            // Usar el action creator
            dispatch(loginSuccess(true, token, savedUser))

            return { hasSession: true, user: savedUser }
        } catch (error) {
            // Limpiar localStorage si está corrupto
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return { hasSession: false }
        }
    }
}

export const filterCards = (gender) => ({
    type: FILTER_CARDS,
    payload: gender
})

export const orderCards = (order) => ({
    type: ORDER_CARDS,
    payload: order
})