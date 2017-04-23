import React, {PureComponent} from 'react';

class PokemonList extends PureComponent {
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
