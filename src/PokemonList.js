import React, {PureComponent} from 'react';

const styles = {
  favorite: {
    color: 'red'
  }
};

class PokemonList extends PureComponent {
  handlePokemonClick(url) {
    this.props.onPokemonClick(url);
  }

  handleFavoriteClick(pokemonName) {
    this.props.onFavoriteClick(pokemonName);
  }

  isFavorite(pokemonNameToFind) {
    return this.props.favoritePokemons.findIndex((pokemonName) => pokemonName === pokemonNameToFind) !== -1;
  }

  getStyle(pokemonName) {
    return this.isFavorite(pokemonName) ?
      Object.assign({}, styles.favorite) :
      {};
  }

  render() {
    return (
      <ul>
        {this.props.pokemons.map(pokemon =>
          <li key={pokemon.name}>
            <span onClick={() => this.handlePokemonClick(pokemon.url)}
                  style={this.getStyle(pokemon.name)}>
              {pokemon.name}
            </span>
            <button onClick={() => this.handleFavoriteClick(pokemon.name)}>
              {this.isFavorite(pokemon.name) ? '-' : '*'}
            </button>
          </li>
        )}
      </ul>
    );
  }
}

export default PokemonList;
