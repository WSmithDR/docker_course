require("dotenv").config()

const {
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    JWT_SECRET,
    PORT_SERVER
} = process.env

module.exports = {
    dbName: DB_NAME,
    dbHost: DB_HOST,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    jwtSecret: JWT_SECRET,
    portServer: PORT_SERVER
}