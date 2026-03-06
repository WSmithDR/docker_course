const server = require("./app")
const { conn } = require("./config/DB_connection")
const { portServer } = require("./config/env")

conn.sync({ force: true }).then(() => {
    server.listen(portServer    , () => console.log(`Server raised in port ${portServer}`))
})