require("dotenv").config()
const express = require("express")
const apiPort = process.env.API_PORT

const server = express()

server.get("/", (req, res)=>{
    res.status(200).send("Hello world!")
})

server.listen(
    apiPort,
    console.log(`Server running at http://localhost:${apiPort}/`)
)