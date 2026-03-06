import axios from 'axios'
import config from '../config'

const api = axios.create({
    baseURL: config.api.baseURL,
    timeout: config.api.timeout,
})

// Interceptor modificado
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        // Solo añadir header si hay token Y no es login
        if (token && !config.url.includes('/login')) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default api