
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => { 
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((convertPokeApiDetailToPokemon))  
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
            .then((response) => response.json())    //Pega a lista e converte em json
            .then((jsonBody) => jsonBody.results)   //Pega todos os detalhes do body e exibe só os resultados
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))   //mapeia os detalhes dos pokemons já convertidos em json
            .then((detailRequests) => Promise.all(detailRequests))  //Espera todas as requisições se completarem
            .then((pokemonsDetails) => pokemonsDetails)
}       

pokeApi.getOnePokemon = (pokemon) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())   
    .then((pokeData) => pokeData)
}