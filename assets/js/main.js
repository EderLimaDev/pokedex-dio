const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMore");
const returnBtn = document.querySelector('.return-btn')
const pokemonDetailsPage = document.querySelector('.pokemonDetails');
const scrollToTopArrow = document.querySelector('.scrollToTop');


const maxRecords = 151;
const limit = 10;
let offset = 0;
let classType = ''

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


async function loadDetailsPage(id) {
 await pokeApi.getOnePokemon(id)
 .then((pokemon) => {
    const {id, name, height, weight} = pokemon
    
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const photo = pokemon.sprites.other.dream_world.front_default
    const ability = pokemon.abilities.map((abilityMove) => abilityMove.ability.name)
    classType = types[0]
  
    document.querySelector('.detailNumber').innerHTML = `#${id}`
    document.querySelector('.detailName').innerHTML = name
    
    document.querySelector('.detail-types').innerHTML = `${types.map((type) => `<li class="type ${type}">${type}</li>`)
      .join("")}`
    document.querySelector('.detail-photo').src = photo
    document.querySelector('.detail-photo').alt = `pokemon ${name}`

    document.querySelector('.detail-pokemon').classList.add(classType) 

    document.querySelector('.pokemon-height').innerHTML = `${height} ft`
    document.querySelector('.pokemon-weight').innerHTML = `${weight} lbs`

    document.querySelector('.pokemon-ability').innerHTML = ability.join(', ')

    pokemonDetailsPage.classList.add('open')
    document.querySelector('html').style.overflow='hidden';
    console.log(classType);
 })



};

returnBtn.addEventListener("click", ()=> {
    pokemonDetailsPage.classList.remove('open');
    document.querySelector('html').style.overflow='auto';
    document.querySelector('.detail-pokemon').classList.remove(classType)

})

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


// Scroll to top arrow function

window.addEventListener("scroll", ()=>  {
  if ( window.scrollY > 100) {
    scrollToTopArrow.classList.add('open')
  } else {
    scrollToTopArrow.classList.remove('open')
  }
})

scrollToTopArrow.addEventListener('click', ()=> {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})