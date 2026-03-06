const { Sequelize } = require(`sequelize`)
const FavoriteModel = require("./../Models/Favorite")
const UserModel = require("./../Models/User")
const { dbUser, dbPassword, dbHost, dbName } = require("./env")



const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
    { logging: false, native: false }
)

const test_db_connection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Db connection stablished")
    } catch (error) {
        console.error("Error", error)
    }
}

test_db_connection()


FavoriteModel(sequelize)
UserModel(sequelize)

//Puse un script para verifir la conexion a la base de datos

const { User, Favorite } = sequelize.models
User.belongsToMany(Favorite, { through: 'user_favorite', timestamps: false })
Favorite.belongsToMany(User, { through: 'user_favorite', timestamps: false })

module.exports = {
    User,
    Favorite,
    conn: sequelize
}
