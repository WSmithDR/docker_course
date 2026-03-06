const app = require("./../src/app")
const session = require("supertest")
const request = session(app)

const character = {
    id: 3535,
    name: "Dai",
    species: "Human",
    gender:"Female",
    status: "Alive",
    origin: {
        name: "Earth (C-137)"
    },
    image: "image.jpg"
}

describe("test de RUTAS", ()=>{
    describe("GET /rickandmorty/character/:id", ()=>{
        it("Responde con status: 200", async ()=>{
            const response = await request.get("/rickandmorty/character/1")
            expect(response.statusCode).toBe(200)
        })

        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () =>
        {
            const response = await request.get("/rickandmorty/character/1")
            for(const prop in character){
                expect(response.body).toHaveProperty(prop)
            }
        })

        it("Si hay un error responde con status: 500", async ()=>{
            const response = await request.get("/rickandmorty/character/665j")
            expect(response.statusCode).toBe(500)
        })
    })

    describe("GET /rickandmorty/login", ()=>{
        const access = {access: true}
        
        it("Responde con un objeto con la propiedad access en true si la información del usuario es válida", async()=>{
            const response = await  request.get("/rickandmorty/login?email=wagnersmith123@hotmail.com&password=@BOLUDO_123")
            expect(response.body).toEqual(access)
        })

        it("Responde con un objeto con la propiedad access en false si la información del usuario no es válida", async()=>{
            const response = await  request.get("/rickandmorty/login?email=wagnersmith123@hotmail.com&password=@BOLUDO_123dfsd")
            access.access = false
            expect(response.body).toEqual(access)
        })
    })

    describe("POST /rickandmorty/fav", ()=> {
        it("Debe guardar el personaje en favoritos", async ()=>{
            const response = await request.post("/rickandmorty/fav")
            .send(character)
            console.log(response.body)
            expect(response.body).toContainEqual(character)
        })

        it("Debe agregar personjaes a favoritos sin eliminar los existentes", async ()=> {
            character.id = 65456
            character.name = "Cuchicuchi"
            const response = await request.post("/rickandmorty/fav").send(character)
            expect(response.body.length).toBe(2)
        })
    })

    describe("DELETE /rickandmorty/fav/:id", ()=>{
        it("si el ID solicitado no existe, debería retornar un arreglo con todos los favoritos", async ()=>{
            const response = await request.delete("/rickandmorty/fav/2")
            expect(response.body.length).toBe(2)
        })

        it("Si el ID enviado existe, debería elminarlo de favoritos", async ()=> {
            const response = await request.delete("/rickandmorty/fav/65456")
            expect(response.body.length).toBe(1)
        })
    })
})