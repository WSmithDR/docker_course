const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/env')


const authMiddleware = (req, res, next) => {
    try {
        // Obtener token del header
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ error: 'Token not provided' })
        }

        // Extraer token (quitar "Bearer ")
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Token format invalid' })
        }

        // Verificar token
        const decoded = jwt.verify(token, jwtSecret)

        // Añadir usuario al request
        req.user = decoded
        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' })
        }
        return res.status(500).json({ error: 'Authentication error' })
    }
}

module.exports = authMiddleware