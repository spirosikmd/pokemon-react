const PouchDB = require('pouchdb-browser');

const pokemonDB = new PouchDB('pokemon');

export function catchPokemon(name) {
  const pokemon = {
    _id: name,
    name,
  };
  return pokemonDB.put(pokemon);
}

export function removePokemon(name) {
  return getPokemon(name).then(result => pokemonDB.remove(result));
}

export function getMyPokemon() {
  return pokemonDB
    .allDocs({ include_docs: true, descending: true })
    .then(result => result.rows.map(row => row.doc));
}

function getPokemon(name) {
  return pokemonDB.get(name);
}
