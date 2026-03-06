const {User} = require("../config/DB_connection")

const postUser = async (request, response) => {
    try {
        const {email, password} = request.body
        
        // Lista de propiedades requeridas
        const requiredProps = ['email', 'password']
        
        // Verificar si alguna propiedad requerida falta
        const missingProps = requiredProps.filter(prop => !request.body[prop])
        
        if (missingProps.length > 0) {
            return response.status(400).json({ 
                error: "Incomplete data",
                missing: missingProps
            })
        }

        // findOrCreate hace todo: busca si existe, si no lo crea
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { password }  // El password se hashea automáticamente
        })

        if (!created) {
            return response.status(409).json({ 
                error: "User already exists",
                field: "email"
            })
        }

        // Retornar respuesta sin el password
        const { password: _, ...userWithoutPassword } = user.dataValues
        
        return response.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword,
            created: true
        })

    } catch (error) {
        return response.status(500).json({error: error.message})
    }
}

module.exports = postUser