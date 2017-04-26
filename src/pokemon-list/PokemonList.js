import React, {PureComponent} from 'react';
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

  isFavorite(pokemonNameToFind) {
    return this.props.favoritePokemons.findIndex((pokemonName) => pokemonName === pokemonNameToFind) !== -1;
  }

  render() {
    const pokemons = this.props.pokemons;
    return (
      <div>
        <ul>
          {pokemons.length > 0 ? (
            pokemons.map(pokemon =>
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

        {pokemons.length > 0 ? (
          <ReactPaginate
            pageCount={this.props.pageCount}
            onPageChange={this.props.onPageChange}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default PokemonList;
