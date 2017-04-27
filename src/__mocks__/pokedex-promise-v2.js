class Pokedex {
  getPokemonByName() {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({
          name: 'pikachu',
        });
      });
    });
  }

  getPokemonsList() {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({
          results: [
            {
              name: 'pikachu',
            },
          ],
          count: 10,
        });
      });
    });
  }
}

module.exports = Pokedex;
