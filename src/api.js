const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();

export function getSinglePokemon(pokemonName) {
  return pokedex.getPokemonByName(pokemonName);
}

export function getAllPokemon() {
  // return Promise.resolve(require('../mock/pokemonList.json'));
  return pokedex.getPokemonsList();
}
