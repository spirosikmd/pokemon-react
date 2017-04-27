import React, { PureComponent } from 'react';
import { getPokemon, getPokemons } from '../api';
import PokemonDetail from '../pokemon-detail/PokemonDetail';
import PokemonList from '../pokemon-list/PokemonList';
import Filters from '../filters/Filters';
import './App.css';
import {
  favoritePokemon,
  getFavoritePokemons,
  removeFavoritePokemon,
} from '../db';

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
      perPage: 20,
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
    this.updateFavoritePokemons();
  }

  updateFavoritePokemons() {
    return getFavoritePokemons().then(favoritePokemons => {
      this.setState({ favoritePokemons: [...favoritePokemons] });
    });
  }

  filterPokemons(pokemons, favoritePokemons, searchText, favoriteOnly) {
    return pokemons
      .filter(pokemon => {
        return !searchText || pokemon.name.indexOf(searchText) !== -1;
      })
      .filter(pokemon => {
        if (!favoriteOnly) {
          return true;
        }
        return this.isFavorite(favoritePokemons, pokemon.name);
      });
  }

  paginatePokemons(filteredPokemons, perPage, selectedPage) {
    const start = Math.ceil(selectedPage * perPage);
    const end = start + perPage - 1;
    return filteredPokemons.slice(start, end + 1);
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

  handleFavoriteClick(favoritePokemons, pokemonNameToFavorite) {
    if (!this.isFavorite(favoritePokemons, pokemonNameToFavorite)) {
      favoritePokemon(pokemonNameToFavorite).then(
        this.updateFavoritePokemons.bind(this)
      );
      return;
    }

    removeFavoritePokemon(pokemonNameToFavorite).then(
      this.updateFavoritePokemons.bind(this)
    );
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

  isFavorite(favoritePokemons, pokemonNameToFavorite) {
    return (
      favoritePokemons.find(
        favoritePokemon => favoritePokemon.name === pokemonNameToFavorite
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

  getPageCount(filteredPokemonsLength, perPage) {
    return Math.ceil(filteredPokemonsLength / perPage);
  }

  render() {
    const {
      selectedPokemon,
      count,
      favoritePokemons,
      searchText,
      favoriteOnly,
      perPage,
    } = this.state;

    const filteredPokemons = this.filterPokemons(
      this.state.pokemons,
      favoritePokemons,
      searchText,
      favoriteOnly
    );
    const paginatedPokemons = this.paginatePokemons(
      filteredPokemons,
      perPage,
      this.state.selectedPage
    );

    const pageCount = this.getPageCount(filteredPokemons.length, perPage);

    return (
      <div>
        {count ? <div>In total there are {count} pokemons!</div> : undefined}

        <Filters
          searchText={searchText}
          favoriteOnly={favoriteOnly}
          onSearchTextInput={this.handleSearchTextInput}
          onFavoriteInput={this.handleFavoriteInput}
        />

        {!this.state.isLoading
          ? <div>
              <PokemonList
                pokemons={paginatedPokemons}
                favoritePokemons={favoritePokemons}
                onPokemonClick={this.handlePokemonClick}
                onFavoriteClick={name =>
                  this.handleFavoriteClick(favoritePokemons, name)}
                onFiltersReset={this.handleFiltersReset}
                onPageChange={this.handlePageChange}
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
