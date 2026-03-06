const login = require("../controllers/login")
const getCharById = require("../controllers/getCharById")
const postFav = require("./../controllers/postFav")
const deleteFav = require("./../controllers/deleteFav")
const postUser = require("./../controllers/postUser")
const authMiddleware = require("../middlewares/auth")

const router = require("express").Router()

router.get("/character/:id", (request, response) =>{
    getCharById(request, response)
})

router.post("/login", login)

// RUTAS PROTEGIDAS con middleware
router.post("/fav", authMiddleware, postFav)

router.delete("/fav/:id", authMiddleware, deleteFav)

router.post("/register", postUser)

module.exports = router