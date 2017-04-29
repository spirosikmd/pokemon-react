import React, { PureComponent } from 'react';
import { getSinglePokemon } from '../api';
import PokemonDetail from '../pokemon-detail/PokemonDetail';
import PokemonList from '../pokemon-list/PokemonList';
import Filters from '../filters/Filters';
import './App.css';
import { catchPokemon, getMyPokemon, removePokemon } from '../db';
import { gql, graphql } from 'react-apollo';

const AllPokemon = gql`
  query {
    pokemons(first: 151) {
      id
      name
      types
      image
      maxHP
      classification
    }
  }
`;

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allPokemon: [],
      myPokemon: [],
      selectedPokemon: null,
      isLoading: true,
      showPokemon: false,
      count: null,
      searchText: '',
      myPokemonOnly: false,
      perPage: 20,
      selectedPage: 0,
    };

    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCatchClick = this.handleCatchClick.bind(this);
    this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
    this.handleMyPokemonInput = this.handleMyPokemonInput.bind(this);
    this.handleFiltersReset = this.handleFiltersReset.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
  }

  componentDidMount() {
    this.updateMyPokemon();
  }

  updateMyPokemon() {
    return getMyPokemon().then(myPokemon => {
      this.setState({ myPokemon: [...myPokemon] });
    });
  }

  filterPokemon(allPokemon, myPokemon, searchText, myPokemonOnly) {
    return allPokemon
      .filter(pokemon => {
        return !searchText || pokemon.name.indexOf(searchText) !== -1;
      })
      .filter(pokemon => {
        if (!myPokemonOnly) {
          return true;
        }
        return this.isMyPokemon(myPokemon, pokemon.name);
      });
  }

  paginatePokemon(filteredPokemon, perPage, selectedPage) {
    const start = Math.ceil(selectedPage * perPage);
    const end = start + perPage - 1;
    return filteredPokemon.slice(start, end + 1);
  }

  handleSearchTextInput(searchText) {
    this.setState({ searchText, selectedPage: 0 });
  }

  handleMyPokemonInput(myPokemonOnly) {
    this.setState({ myPokemonOnly, selectedPage: 0 });
  }

  handlePokemonClick(pokemonName) {
    getSinglePokemon(pokemonName).then(pokemonResponse => {
      const selectedPokemon = Object.assign({}, pokemonResponse);
      this.setState({ selectedPokemon, showPokemon: true });
    });
  }

  handleCatchClick(myPokemon, pokemonNameToCatch) {
    if (!this.isMyPokemon(myPokemon, pokemonNameToCatch)) {
      catchPokemon(pokemonNameToCatch).then(this.updateMyPokemon.bind(this));
      return;
    }

    removePokemon(pokemonNameToCatch).then(this.updateMyPokemon.bind(this));
  }

  handleFiltersReset() {
    this.setState({ searchText: '', myPokemonOnly: false, selectedPage: 0 });
  }

  handlePageChange({ selected }) {
    this.setState({ selectedPage: selected });
  }

  handleCloseModal() {
    this.setState({ showPokemon: false });
  }

  handlePerPageChange(perPage) {
    this.setState({ perPage });
  }

  isMyPokemon(myPokemon, pokemonName) {
    return (
      myPokemon.find(pokemon => pokemon.name === pokemonName) !== undefined
    );
  }

  onGetAllPokemonSuccess({ results, count }) {
    const allPokemon = [...results];
    this.setState({
      allPokemon,
      isLoading: false,
      count,
    });
  }

  getPageCount(filteredPokemonLength, perPage) {
    return Math.ceil(filteredPokemonLength / perPage);
  }

  render() {
    const {
      selectedPokemon,
      myPokemon,
      searchText,
      myPokemonOnly,
      perPage,
    } = this.state;

    const { pokemons, loading } = this.props.data;

    const filteredPokemon = this.filterPokemon(
      pokemons ? [...pokemons] : [],
      myPokemon,
      searchText,
      myPokemonOnly
    );

    const paginatedPokemon = this.paginatePokemon(
      filteredPokemon,
      perPage,
      this.state.selectedPage
    );

    const pageCount = this.getPageCount(filteredPokemon.length, perPage);

    return (
      <div>
        {pokemons &&
          pokemons.length &&
          <div>
            In total there are {pokemons.length} pokemon!
          </div>}

        <Filters
          searchText={searchText}
          myPokemonOnly={myPokemonOnly}
          onSearchTextInput={this.handleSearchTextInput}
          onMyPokemonInput={this.handleMyPokemonInput}
        />

        {!loading
          ? <div>
              <PokemonList
                allPokemon={paginatedPokemon}
                myPokemon={myPokemon}
                onPokemonClick={this.handlePokemonClick}
                onCatchClick={name => this.handleCatchClick(myPokemon, name)}
                onFiltersReset={this.handleFiltersReset}
                onPageChange={this.handlePageChange}
                onPerPageChange={this.handlePerPageChange}
                pageCount={pageCount}
                perPage={perPage}
              />
            </div>
          : <div>Loading...</div>}

        {selectedPokemon &&
          <PokemonDetail
            pokemon={selectedPokemon}
            show={this.state.showPokemon}
            onCloseModal={this.handleCloseModal}
          />}
      </div>
    );
  }
}

const AppWithData = graphql(AllPokemon)(App);

export default AppWithData;
