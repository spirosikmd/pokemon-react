import React, {PureComponent} from 'react';
import {getPokemon, getPokemons} from './api';
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      favoritePokemons: [],
      selectedPokemon: null,
      isLoading: true,
      previousLink: null,
      nextLink: null,
      showPokemon: false,
      count: null
    };

    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePokemonClick = this.handlePokemonClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentDidMount() {
    getPokemons()
      .then(this.onGetPokemonsSuccess.bind(this));
  }

  handlePokemonClick(pokemonUrl) {
    getPokemon(pokemonUrl)
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

    this.setState({favoritePokemons: this.state.favoritePokemons.filter((pokemonName) => pokemonName !== pokemonNameToFavorite)});
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
      nextLink: pokemonsResponse.next,
      previousLink: pokemonsResponse.previous,
      count: pokemonsResponse.count
    });
  }

  handlePreviousClick() {
    const previousLink = this.state.previousLink;
    getPokemons(previousLink)
      .then(this.onGetPokemonsSuccess.bind(this));
  }

  handleNextClick() {
    const nextLink = this.state.nextLink;
    getPokemons(nextLink)
      .then(this.onGetPokemonsSuccess.bind(this));
  }

  render() {
    const isLoading = this.state.isLoading;
    const pokemons = this.state.pokemons;
    const selectedPokemon = this.state.selectedPokemon;
    const previousLink = this.state.previousLink;
    const nextLink = this.state.nextLink;
    const showPokemon = this.state.showPokemon;
    const count = this.state.count;
    const favoritePokemons = this.state.favoritePokemons;

    return (
      <div>
        {count ? (
          <div>In total there are {this.state.count} pokemons!</div>
        ) : (
          undefined
        )}
        {!isLoading ? (
          <div>
            <PokemonList pokemons={pokemons}
                         favoritePokemons={favoritePokemons}
                         onPokemonClick={this.handlePokemonClick}
                         onFavoriteClick={this.handleFavoriteClick}/>
            <button onClick={this.handlePreviousClick} disabled={!previousLink}>previous</button>
            <button onClick={this.handleNextClick} disabled={!nextLink}>next</button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {selectedPokemon ? (
          <Pokemon pokemon={selectedPokemon} show={showPokemon} onCloseModal={this.handleCloseModal}/>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default App;
