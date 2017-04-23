import React, {Component} from 'react';
import {getPokemons, getPokemon} from './api';
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      selectedPokemon: null,
      isLoading: true,
      previousLink: null,
      nextLink: null
    };

    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePokemonSelect = this.handlePokemonSelect.bind(this);
  }

  componentDidMount() {
    getPokemons()
      .then(this.onGetPokemonsSuccess.bind(this));
  }

  handlePokemonSelect(pokemonUrl) {
    getPokemon(pokemonUrl)
      .then((pokemonResponse) => {
        const selectedPokemon = Object.assign({}, pokemonResponse);
        this.setState({selectedPokemon});
      });
  }

  onGetPokemonsSuccess(pokemonsResponse) {
    const pokemons = [...pokemonsResponse.results];
    this.setState({
      pokemons,
      isLoading: false,
      nextLink: pokemonsResponse.next,
      previousLink: pokemonsResponse.previous
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

    return (
      <div>
        {!isLoading ? (
          <div>
            <PokemonList pokemons={pokemons} onPokemonSelect={this.handlePokemonSelect} />
            <button onClick={this.handlePreviousClick} disabled={!previousLink}>previous</button>
            <button onClick={this.handleNextClick} disabled={!nextLink}>next</button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {selectedPokemon ? (
          <Pokemon pokemon={selectedPokemon} />
        ): (
          <div>Select a pokemon!</div>
        )}
      </div>
    );
  }
}

export default App;
