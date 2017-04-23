import React, {Component} from 'react';

class PokemonList extends Component {
  handlePokemonClick(url) {
    this.props.onPokemonSelect(url);
  }

  render() {
    return (
      <ul>
        {this.props.pokemons.map(pokemon =>
          <li key={pokemon.name} onClick={() => this.handlePokemonClick(pokemon.url)}>{pokemon.name}</li>
        )}
      </ul>
    );
  }
}

export default PokemonList;
