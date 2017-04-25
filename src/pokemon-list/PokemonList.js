import React, {PureComponent} from 'react';
import PokemonRow from '../pokemon-row/PokemonRow';

class PokemonList extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handlePokemonClick(pokemonName) {
    this.props.onPokemonClick(pokemonName);
  }

  handleFavoriteClick(pokemonName) {
    this.props.onFavoriteClick(pokemonName);
  }

  isFavorite(pokemonNameToFind) {
    return this.props.favoritePokemons.findIndex((pokemonName) => pokemonName === pokemonNameToFind) !== -1;
  }

  render() {
    const searchText = this.props.searchText;
    const filteredPokemon = this.props.pokemons
      .filter((pokemon) => {
        return !searchText || pokemon.name.indexOf(searchText) !== -1;
      }).filter((pokemon) => {
        if (!this.props.favoriteOnly) {
          return true;
        }
        return this.isFavorite(pokemon.name);
      });

    return (
      <ul>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map(pokemon =>
            <PokemonRow
              key={pokemon.name}
              pokemon={pokemon}
              isFavorite={this.isFavorite(pokemon.name)}
              onPokemonClick={this.handlePokemonClick}
              onFavoriteClick={this.handleFavoriteClick}
            />
          )
        ) : (
          <div>
            <span>No results</span>
            <button onClick={this.props.onFiltersReset}>reset</button>
          </div>
        )}
      </ul>
    );
  }
}

export default PokemonList;
