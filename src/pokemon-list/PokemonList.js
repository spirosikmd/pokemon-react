import React, { PureComponent } from 'react';
import PokemonRow from '../pokemon-row/PokemonRow';
import ReactPaginate from 'react-paginate';

class PokemonList extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleCatchClick = this.handleCatchClick.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
  }

  handlePokemonClick(pokemonName) {
    this.props.onPokemonClick(pokemonName);
  }

  handleCatchClick(pokemonName) {
    this.props.onCatchClick(pokemonName);
  }

  handlePerPageChange(event) {
    this.props.onPerPageChange(parseInt(event.target.value, 10));
  }

  isMyPokemon(myPokemon, pokemonNameToFind) {
    return (
      myPokemon.findIndex(pokemon => pokemon.name === pokemonNameToFind) !== -1
    );
  }

  render() {
    const allPokemon = this.props.allPokemon;
    const myPokemon = this.props.myPokemon;

    return (
      <div>
        {allPokemon.length > 0 &&
          <div>
            <ul>
              {allPokemon.map(pokemon => (
                <PokemonRow
                  key={pokemon.name}
                  pokemon={pokemon}
                  isMyPokemon={this.isMyPokemon(myPokemon, pokemon.name)}
                  onPokemonClick={this.handlePokemonClick}
                  onCatchClick={this.handleCatchClick}
                />
              ))}
            </ul>

            <label>
              Per page:
              <select
                value={this.props.perPage}
                onChange={this.handlePerPageChange}
              >
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="80">80</option>
              </select>
            </label>

            <ReactPaginate
              pageCount={this.props.pageCount}
              onPageChange={this.props.onPageChange}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
            />
          </div>}

        {allPokemon.length === 0 &&
          <div>
            <span>No results</span>
            <button onClick={this.props.onFiltersReset}>reset</button>
          </div>}
      </div>
    );
  }
}

export default PokemonList;
