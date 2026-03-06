const URL = `https://rickandmortyapi.com/api/character`
const axios = require("axios")

const getCharById = async (request, response) => {
    try {
        const {id} = request.params
        const {data} = await axios(`${URL}/${id}`)

        if(!data.name) throw new Error(`ID: ${id} not found!`)

        const character = {
            id: data.id,
            name: data.name,
            species: data.species,
            origin: data.origin,
            image: data.image,
            gender: data.gender,
            status: data.status
        }
        return response.status(200).json(character)

    } catch (error) {
        return error.message.includes("ID")
        ? response.status(404).send(error.message)
        : response.status(500).send(error.response.data.error)
    }
}

module.exports = getCharById