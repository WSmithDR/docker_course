const { Favorite, User, conn } = require("../config/DB_connection")

const deleteFav = async (request, response) => {
    const transaction = await conn.transaction()
    
    try {
        const { id } = request.params
        
        if (!request.user) {
            await transaction.rollback()
            return response.status(401).json({ error: 'Authentication required' })
        }

        // Encontrar al usuario autenticado
        const user = await User.findByPk(request.user.id, { transaction })
        if (!user) {
            await transaction.rollback()
            return response.status(404).json({ error: 'User not found' })
        }

        // Encontrar el favorito con sus usuarios asociados
        const favorite = await Favorite.findByPk(id, {
            include: [{
                model: User,
                through: 'user_favorite'
            }],
            transaction
        })
        
        if (!favorite) {
            await transaction.rollback()
            return response.status(404).json({ error: 'Favorite not found' })
        }

        // Eliminar la relación con el usuario actual
        await user.removeFavorite(favorite, { transaction })

        // 🔥 CORRECCIÓN: Volver a contar usuarios DESPUÉS de eliminar
        const favoriteAfterRemoval = await Favorite.findByPk(id, {
            include: [{
                model: User,
                through: 'user_favorite'
            }],
            transaction
        })
        
        const remainingUsers = favoriteAfterRemoval.Users ? favoriteAfterRemoval.Users.length : 0
        
        if (remainingUsers === 0) {
            // Si no hay más usuarios asociados, eliminar el favorito
            await favorite.destroy({ transaction })
            console.log(`Favorite ${id} deleted - no users associated`)
        } else {
            console.log(`Favorite ${id} kept - ${remainingUsers} users still associated`)
        }

        // Obtener favoritos actualizados del usuario
        const userFavorites = await user.getFavorites({ transaction })
        
        await transaction.commit()
        
        return response.status(200).json({
            favorites: userFavorites,
            favoriteDeleted: remainingUsers === 0
        })
        
    } catch (error) {
        await transaction.rollback()
        return response.status(500).json({ error: error.message })
    }
}

module.exports = deleteFav