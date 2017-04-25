import React, {PureComponent} from 'react';
import {getPokemon, getPokemons} from '../api';
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
      favoriteOnly: false
    };

    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
    this.handleFavoriteInput = this.handleFavoriteInput.bind(this);
    this.handleFiltersReset = this.handleFiltersReset.bind(this);
  }

  componentDidMount() {
    getPokemons()
      .then(this.onGetPokemonsSuccess.bind(this));
  }

  handleSearchTextInput(searchText) {
    this.setState({searchText});
  }

  handleFavoriteInput(favoriteOnly) {
    this.setState({favoriteOnly})
  }

  handlePokemonClick(pokemonName) {
    getPokemon(pokemonName)
      .then((pokemonResponse) => {
        const selectedPokemon = Object.assign({}, pokemonResponse);
        this.setState({selectedPokemon, showPokemon: true});
      });
  }

  handleFavoriteClick(pokemonNameToFavorite) {
    const isFavorite = this.isFavorite(pokemonNameToFavorite);

    if (!isFavorite) {
      this.setState({favoritePokemons: [...this.state.favoritePokemons, pokemonNameToFavorite]});
      return;
    }

    this.setState({
      favoritePokemons: this.state.favoritePokemons.filter((pokemonName) => {
        return pokemonName !== pokemonNameToFavorite;
      })
    });
  }

  handleFiltersReset() {
    this.setState({searchText: '', favoriteOnly: false});
  }

  isFavorite(pokemonNameToFavorite) {
    return this.state.favoritePokemons.find((pokemonName) => pokemonName === pokemonNameToFavorite) !== undefined;
  }

  handleCloseModal() {
    this.setState({showPokemon: false});
  }

  onGetPokemonsSuccess(pokemonsResponse) {
    const pokemons = [...pokemonsResponse.results];
    this.setState({
      pokemons,
      isLoading: false,
      count: pokemonsResponse.count
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    const pokemons = this.state.pokemons;
    const selectedPokemon = this.state.selectedPokemon;
    const showPokemon = this.state.showPokemon;
    const count = this.state.count;
    const favoritePokemons = this.state.favoritePokemons;

    return (
      <div>
        {count ? (
          <div>In total there are {count} pokemons!</div>
        ) : (
          undefined
        )}

        <Filters
          searchText={this.state.searchText}
          favoriteOnly={this.state.favoriteOnly}
          onSearchTextInput={this.handleSearchTextInput}
          onFavoriteInput={this.handleFavoriteInput}
        />

        {!isLoading ? (
          <div>
            <PokemonList
              pokemons={pokemons}
              favoritePokemons={favoritePokemons}
              onPokemonClick={this.handlePokemonClick}
              onFavoriteClick={this.handleFavoriteClick}
              onFiltersReset={this.handleFiltersReset}
              searchText={this.state.searchText}
              favoriteOnly={this.state.favoriteOnly}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}

        {selectedPokemon ? (
          <PokemonDetail pokemon={selectedPokemon} show={showPokemon} onCloseModal={this.handleCloseModal}/>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default App;
