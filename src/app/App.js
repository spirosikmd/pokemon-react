import React, { PureComponent } from 'react';
import { getPokemon, getPokemons } from '../api';
import PokemonDetail from '../pokemon-detail/PokemonDetail';
import PokemonList from '../pokemon-list/PokemonList';
import Filters from '../filters/Filters';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      favoritePokemons: [],
      selectedPokemon: null,
      isLoading: true,
      showPokemon: false,
      count: null,
      searchText: '',
      favoriteOnly: false,
      perPage: 10,
      selectedPage: 0,
    };

    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
    this.handleFavoriteInput = this.handleFavoriteInput.bind(this);
    this.handleFiltersReset = this.handleFiltersReset.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    getPokemons().then(this.onGetPokemonsSuccess.bind(this));
  }

  filterPokemons(pokemons) {
    const searchText = this.state.searchText;
    return pokemons
      .filter(pokemon => {
        return !searchText || pokemon.name.indexOf(searchText) !== -1;
      })
      .filter(pokemon => {
        if (!this.state.favoriteOnly) {
          return true;
        }
        return this.isFavorite(pokemon.name);
      });
  }

  paginatePokemons(filteredPokemons, perPage, selectedPage) {
    const start = Math.ceil(selectedPage * perPage);
    const end = start + perPage - 1;
    return filteredPokemons.slice(start, end);
  }

  handleSearchTextInput(searchText) {
    this.setState({ searchText, selectedPage: 0 });
  }

  handleFavoriteInput(favoriteOnly) {
    this.setState({ favoriteOnly, selectedPage: 0 });
  }

  handlePokemonClick(pokemonName) {
    getPokemon(pokemonName).then(pokemonResponse => {
      const selectedPokemon = Object.assign({}, pokemonResponse);
      this.setState({ selectedPokemon, showPokemon: true });
    });
  }

  handleFavoriteClick(pokemonNameToFavorite) {
    const isFavorite = this.isFavorite(pokemonNameToFavorite);

    if (!isFavorite) {
      this.setState({
        favoritePokemons: [
          ...this.state.favoritePokemons,
          pokemonNameToFavorite,
        ],
      });
      return;
    }

    this.setState({
      favoritePokemons: this.state.favoritePokemons.filter(pokemonName => {
        return pokemonName !== pokemonNameToFavorite;
      }),
    });
  }

  handleFiltersReset() {
    this.setState({ searchText: '', favoriteOnly: false, selectedPage: 0 });
  }

  handlePageChange({ selected }) {
    this.setState({ selectedPage: selected });
  }

  handleCloseModal() {
    this.setState({ showPokemon: false });
  }

  isFavorite(pokemonNameToFavorite) {
    return (
      this.state.favoritePokemons.find(
        pokemonName => pokemonName === pokemonNameToFavorite
      ) !== undefined
    );
  }

  onGetPokemonsSuccess({ results, count }) {
    const pokemons = [...results];
    this.setState({
      pokemons,
      isLoading: false,
      count,
    });
  }

  getPageCount(filteredPokemons, perPage) {
    return Math.ceil(filteredPokemons.length / perPage);
  }

  render() {
    const selectedPokemon = this.state.selectedPokemon;
    const count = this.state.count;

    const filteredPokemons = this.filterPokemons(this.state.pokemons);
    const paginatedPokemons = this.paginatePokemons(
      filteredPokemons,
      this.state.perPage,
      this.state.selectedPage
    );

    const pageCount = this.getPageCount(filteredPokemons, this.state.perPage);

    return (
      <div>
        {count ? <div>In total there are {count} pokemons!</div> : undefined}

        <Filters
          searchText={this.state.searchText}
          favoriteOnly={this.state.favoriteOnly}
          onSearchTextInput={this.handleSearchTextInput}
          onFavoriteInput={this.handleFavoriteInput}
        />

        {!this.state.isLoading
          ? <div>
              <PokemonList
                pokemons={paginatedPokemons}
                favoritePokemons={this.state.favoritePokemons}
                onPokemonClick={this.handlePokemonClick}
                onFavoriteClick={this.handleFavoriteClick}
                onFiltersReset={this.handleFiltersReset}
                onPageChange={this.handlePageChange}
                searchText={this.state.searchText}
                favoriteOnly={this.state.favoriteOnly}
                pageCount={pageCount}
              />
            </div>
          : <div>Loading...</div>}

        {selectedPokemon
          ? <PokemonDetail
              pokemon={selectedPokemon}
              show={this.state.showPokemon}
              onCloseModal={this.handleCloseModal}
            />
          : undefined}
      </div>
    );
  }
}

export default App;
