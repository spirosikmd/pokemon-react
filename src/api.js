const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();

export function getPokemon(pokemonName) {
  return pokedex.getPokemonByName(pokemonName);
}

export function getPokemons() {
  // return Promise.resolve(require('../mock/pokemonList.json'));
  return pokedex.getPokemonsList();
}
