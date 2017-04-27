import React from 'react';
import renderer from 'react-test-renderer';
import PokemonList from './PokemonList';

const pokemons = [
  {
    name: 'pikachu',
  },
];

const favoritePokemons = [
  {
    name: 'pikachu',
  },
];

test('PokemonList renders a list of pokemon and pagination', () => {
  const component = renderer.create(
    <PokemonList
      pokemons={pokemons}
      favoritePokemons={favoritePokemons}
      pageCount={1}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PokemonList isFavorite returns true when pokemon name is part of favorite', () => {
  const pokemonList = new PokemonList();
  expect(pokemonList.isFavorite(favoritePokemons, pokemons[0].name)).toBe(true);
});

test('PokemonList isFavorite returns false when pokemon name is not part of favorite', () => {
  const pokemonList = new PokemonList();
  expect(pokemonList.isFavorite(favoritePokemons, 'bulbasar')).toBe(false);
});
