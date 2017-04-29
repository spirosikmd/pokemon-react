import React, { PureComponent } from 'react';
import PokemonRow from '../pokemon-row/PokemonRow';
import ReactPaginate from 'react-paginate';
import { Grid, Button, Select } from 'semantic-ui-react';

const perPageOptions = [
  {
    key: '20',
    value: '20',
    text: '20',
  },
  {
    key: '40',
    value: '40',
    text: '40',
  },
  {
    key: '80',
    value: '80',
    text: '80',
  },
];

class PokemonList extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleCatchClick = this.handleCatchClick.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
  }

  handlePokemonClick(pokemon) {
    this.props.onPokemonClick(pokemon);
  }

  handleCatchClick(pokemonName) {
    this.props.onCatchClick(pokemonName);
  }

  handlePerPageChange(event, { value }) {
    this.props.onPerPageChange(value);
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
            <div style={{ margin: '1rem 0' }}>
              <Grid>
                {allPokemon.map(pokemon => (
                  <Grid.Column
                    key={pokemon.name}
                    mobile={8}
                    tablet={5}
                    computer={4}
                  >
                    <PokemonRow
                      pokemon={pokemon}
                      isMyPokemon={this.isMyPokemon(myPokemon, pokemon.name)}
                      onPokemonClick={this.handlePokemonClick}
                      onCatchClick={this.handleCatchClick}
                    />
                  </Grid.Column>
                ))}
              </Grid>
            </div>

            <Select
              placeholder="Select per page"
              options={perPageOptions}
              value={this.props.perPage}
              onChange={this.handlePerPageChange}
            />

            <ReactPaginate
              pageCount={this.props.pageCount}
              onPageChange={this.props.onPageChange}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
            />
          </div>}

        {allPokemon.length === 0 &&
          <div style={{ margin: '1rem 0' }}>
            <h3>No results :(</h3>
            <Button onClick={this.props.onFiltersReset}>reset</Button>
          </div>}
      </div>
    );
  }
}

export default PokemonList;
