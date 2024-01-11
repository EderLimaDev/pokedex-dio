const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMore");
const pokemonDetailsPage = document.querySelector('.pokemonDetails');


const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${
          pokemon.type
        }" id="pokemon" onclick='loadDetailsPage(${pokemon.number})' >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li> 
    `;
}


function loadDetailsPage(id) {
 pokeApi.getOnePokemon(id)
 .then((pokemon) => {
    const {id, name, height, weight} = pokemon
    
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const photo = pokemon.sprites.other.dream_world.front_default


    document.querySelector('.detailNumber').innerHTML = id
    document.querySelector('.detailName').innerHTML = name
    
    document.querySelector('.detail-type1').innerHTML = types[0]
    document.querySelector('.detail-type2').innerHTML = types[1]
    
    document.querySelector('.detail-photo').src = photo
    document.querySelector('.detail-photo').alt = `pokemon ${name}`

    document.querySelector('.detail-pokemon').classList.add(types[0]) 

    document.querySelector('.pokemon-height').innerHTML = height
    document.querySelector('.pokemon-weight').innerHTML = `${weight} lbs`

    document.querySelector('.pokemon-ability1').innerHTML = name
    document.querySelector('.pokemon-ability2').innerHTML = name



    console.log(id, name, height, types);
 })



};



function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
