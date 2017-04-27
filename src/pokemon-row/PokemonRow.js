import React, { PureComponent } from 'react';

const styles = {
  myPokemon: {
    color: 'red',
  },
};

class PokemonRow extends PureComponent {
  handlePokemonClick(pokemonName) {
    this.props.onPokemonClick(pokemonName);
  }

  handleCatchClick(pokemonName) {
    this.props.onCatchClick(pokemonName);
  }

  getStyle(isMyPokemon) {
    return isMyPokemon ? Object.assign({}, styles.myPokemon) : {};
  }

  render() {
    const pokemon = this.props.pokemon;

    return (
      <li>
        <span
          onClick={() => this.handlePokemonClick(pokemon.name)}
          style={this.getStyle(this.props.isMyPokemon)}
        >
          {pokemon.name}
        </span>
        <button onClick={() => this.handleCatchClick(pokemon.name)}>
          {this.props.isMyPokemon ? 'set free..' : 'catch!'}
        </button>
      </li>
    );
  }
}

export default PokemonRow;
