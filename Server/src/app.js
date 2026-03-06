const express = require("express")
const server = express()
const router = require("./routes/index")
const morgan = require("morgan")
const cors = require('cors')

server.use(express.json())
server.use(morgan("dev"))


server.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

/*server.use((request, response, next)=> {
    response.header("Access-Control-Allow-Origin","*")
    response.header("Access-Control-Allow-Credentials", "true")
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    )
    response.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    )
    next()
})*/

server.use("/rickandmorty", router)

module.exports = server