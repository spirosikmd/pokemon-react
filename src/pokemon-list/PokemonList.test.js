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

const mockHandlePerPageChange = jest.fn();

test('PokemonList renders a list of pokemon and pagination', () => {
  const component = renderer.create(
    <PokemonList
      pokemons={pokemons}
      favoritePokemons={favoritePokemons}
      pageCount={1}
      onPerPageChange={mockHandlePerPageChange}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const select = tree.children[0].children[1].children[1];
  select.props.onChange({
    target: {
      value: '20',
    },
  });
  expect(mockHandlePerPageChange.mock.calls.length).toBe(1);
  expect(mockHandlePerPageChange.mock.calls[0][0]).toBe(20);
});

test('PokemonList isFavorite returns true when pokemon name is part of favorite', () => {
  const pokemonList = new PokemonList();
  expect(pokemonList.isFavorite(favoritePokemons, pokemons[0].name)).toBe(true);
});

test('PokemonList isFavorite returns false when pokemon name is not part of favorite', () => {
  const pokemonList = new PokemonList();
  expect(pokemonList.isFavorite(favoritePokemons, 'bulbasar')).toBe(false);
});
