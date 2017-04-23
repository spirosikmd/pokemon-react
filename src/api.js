import pokemonData from './pokemon.json';
import pokemonsData from './pokemons.json';
import pokemonsOtherData from './pokemonsOther.json'

export function getPokemon(url) {
  if (!url) {
    return Promise.resolve({});
  }
  // return fetch(url)
  //   .then((response) => response.json());
  return Promise.resolve(pokemonData);
}

export function getPokemons(url = 'http://pokeapi.co/api/v2/pokemon/') {
  // return fetch(url)
  //   .then((response) => response.json());
  if (url !== 'http://pokeapi.co/api/v2/pokemon/') {
    return Promise.resolve(pokemonsOtherData);
  }
  return Promise.resolve(pokemonsData);
}
