import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});

server.register(cors,
    {
        origin: "*"
    }
)

const movies = [
        {id:1, name: "Star Wars: Ep I - A Ameaça Fantasma", year: 1999},
        {id:2, name: "Star Wars: Ep II - Ataque dos Clones", year: 2002},
        {id:3, name: "Star Wars: Ep III - A Vingança dos Sith", year: 2005},
        {id:4, name: "Star Wars: Ep IV - Uma Nova Esperança", year: 1977},
        {id:5, name: "Star Wars: Ep V - O Império Contra-Ataca", year: 1980},
        {id:6, name: "Star Wars: Ep VI - O Retorno de Jedi", year: 1983},
        {id:7, name: "Star Wars: O Despertar da Força", year: 2015},
        {id:8, name: "Star Wars: Os Últimos Jedi", year: 2017},
        {id:9, name: "Star Wars: A Ascenção Skywalker", year: 2019},
    ]

    const characters = [
        {id:1, name: "Luke Skywalker", movie: [4,5,6,8]}, 
        {id:2, name: "Leia Skywalker", movie: [4,5,6]}, 
        {id:3, name: "Anakin Skywalker", movie: [1,2,3]}, 
        {id:4, name: "Darth Vader", movie: [4,5,6]}, 
        {id:5, name: "Obi-Wan Kenobi", movie: [1,2,3,4,5,6]}, 
        {id:6, name: "Yoda", movie: [1,2,3,5,6,8]}, 
        {id:7, name: "Rey", movie: [7,8,9]}, 
        {id:8, name: "Padmé Amidala", movie: [1,2,3]}, 
        {id:9, name: "Han Solo", movie: [4,5,6,7,9]}, 
    ]

server.get("/movies",async(request, response) => {
    response.type("application/json").code(200)
    return movies;
});

server.get("/characters", async (request, response) => {
    response.type("application/json").code(200)
    return characters
});

interface CharacterParams{
    movie: string
}

server.get<{Params: CharacterParams}>("/characters/:movie", async (request, response) => {
    const param = parseInt(request.params.movie);
    const filterCharac = characters.filter( c => c.movie.includes(param));
    const filterMovie = movies.find( m => m.id === param);

    if (!filterMovie){
        response.type("application/json").code(404)
        return { message: "Movie Not Found"}
    }

    if (filterCharac.length === 0){
        response.type("application/json").code(204)
        return { message: "None character in that Movie"}
    }

    response.type("application/json").code(200)
    return { filterCharac }

})


server.listen({port: 3333}, () => {
    console.log("Server init");
})