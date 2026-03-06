const { Favorite, User, conn } = require("../config/DB_connection")

const postFav = async (request, response) => {
    const transaction = await conn.transaction()
    
    try {
        const { id, name, origin, status, image, species, gender } = request.body
        
        // Lista de propiedades requeridas
        const requiredProps = ['id', 'name', 'origin', 'status', 'image', 'species', 'gender']
        const missingProps = requiredProps.filter(prop => !request.body[prop])
        
        if (missingProps.length > 0) {
            await transaction.rollback()
            return response.status(400).json({ 
                error: "Incomplete data",
                missing: missingProps
            })
        }

        // Crear o encontrar el favorito
        const [favorite, created] = await Favorite.findOrCreate({
            where: { id, name, origin, status, image, species, gender },
            transaction
        })

        // Encontrar al usuario autenticado
        const user = await User.findByPk(request.user.id, { transaction })
        if (!user) {
            await transaction.rollback()
            return response.status(404).json({ error: 'User not found' })
        }

        // Asociar el favorito al usuario
        await user.addFavorite(favorite, { transaction })
        
        // Obtener los favoritos actualizados del usuario
        const userFavorites = await user.getFavorites({ transaction })
        
        const message = created 
            ? "Favorite added successfully" 
            : "Favorite already exists"
        
        await transaction.commit()
        
        return response.status(200).json({
            message,
            favorites: userFavorites,
            wasCreated: created
        })
        
    } catch (error) {
        await transaction.rollback()
        return response.status(500).json({ error: error.message })
    }
}

module.exports = postFav