import React, { PureComponent } from 'react';
import PokemonRow from '../pokemon-row/PokemonRow';
import ReactPaginate from 'react-paginate';

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

  isFavorite(favoritePokemons, pokemonNameToFind) {
    return (
      favoritePokemons.findIndex(
        favoritePokemon => favoritePokemon.name === pokemonNameToFind
      ) !== -1
    );
  }

  render() {
    const pokemons = this.props.pokemons;
    const favoritePokemons = this.props.favoritePokemons;

    return (
      <div>
        {pokemons.length > 0 &&
          <ul>
            {pokemons.map(pokemon => (
              <PokemonRow
                key={pokemon.name}
                pokemon={pokemon}
                isFavorite={this.isFavorite(favoritePokemons, pokemon.name)}
                onPokemonClick={this.handlePokemonClick}
                onFavoriteClick={this.handleFavoriteClick}
              />
            ))}
          </ul>}

        {pokemons.length > 0 &&
          <ReactPaginate
            pageCount={this.props.pageCount}
            onPageChange={this.props.onPageChange}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
          />}

        {pokemons.length === 0 &&
          <div>
            <span>No results</span>
            <button onClick={this.props.onFiltersReset}>reset</button>
          </div>}
      </div>
    );
  }
}

export default PokemonList;
