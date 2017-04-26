const PouchDB = require('pouchdb-browser');

const favoriteDB = new PouchDB('pokemon-favorite');

export function favoritePokemon(name) {
  const favoritePokemon = {
    _id: name,
    name,
  };
  return favoriteDB.put(favoritePokemon);
}

export function removeFavoritePokemon(name) {
  return getFavoritePokemon(name).then(result => favoriteDB.remove(result));
}

export function getFavoritePokemons() {
  return favoriteDB
    .allDocs({ include_docs: true, descending: true })
    .then(result => result.rows.map(row => row.doc));
}

function getFavoritePokemon(name) {
  return favoriteDB.get(name);
}
