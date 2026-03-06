const { User } = require("./../config/DB_connection")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/env')


const login = async (request, response) => {
    try {
        const { email, password } = request.body  // Cambiado de query a body
        if (!email || !password) return response.status(400).send("Incomplete data")

        const user = await User.findOne({
            where: { email }
        })

        console.log('User found:', user)
        console.log('Password in DB:', user.password)
        console.log('Password provided:', password)
        // Asegúrate que jwtSecret existe
        console.log('jwtSecret:', jwtSecret)

        if (!user) return response.status(404).send("User not found!")

        // Verificar password hasheado
        const isValidPassword = bcrypt.compareSync(password, user.password)
        console.log('Password valid:', isValidPassword)
        // En login.js, después de console.log('Password valid:', isValidPassword)
        console.log('Testing bcrypt manually:')
        console.log('Hash length:', user.password.length)
        console.log('Password length:', password.length)

        // Test manual de bcrypt
        const testHash = bcrypt.hashSync(password, 10)
        console.log('New hash would be:', testHash)

        const testCompare = bcrypt.compareSync(password, testHash)
        console.log('New hash validates:', testCompare)
        if (!isValidPassword) return response.status(403).send("Incorrect password!")

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            jwtSecret,
            { expiresIn: '1h' }
        )

        return response.status(200).json({
            access: true,
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        })

    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

module.exports = login