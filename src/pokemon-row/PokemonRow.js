import React, { Component } from 'react';

const styles = {
  favorite: {
    color: 'red',
  },
};

class PokemonRow extends Component {
  handlePokemonClick(pokemonName) {
    this.props.onPokemonClick(pokemonName);
  }

  handleFavoriteClick(pokemonName) {
    this.props.onFavoriteClick(pokemonName);
  }

  getStyle() {
    return this.props.isFavorite ? Object.assign({}, styles.favorite) : {};
  }

  render() {
    const pokemon = this.props.pokemon;

    return (
      <li>
        <span
          onClick={() => this.handlePokemonClick(pokemon.name)}
          style={this.getStyle(pokemon.name)}
        >
          {pokemon.name}
        </span>
        <button onClick={() => this.handleFavoriteClick(pokemon.name)}>
          {this.props.isFavorite ? '-' : '*'}
        </button>
      </li>
    );
  }
}

export default PokemonRow;
