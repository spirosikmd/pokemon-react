import React from 'react';
import renderer from 'react-test-renderer';
import PokemonList from './PokemonList';

const allPokemon = [
  {
    name: 'pikachu',
  },
];

const myPokemon = [
  {
    name: 'pikachu',
  },
];

const mockHandlePerPageChange = jest.fn();

test('PokemonList renders a list of pokemon and pagination', () => {
  const component = renderer.create(
    <PokemonList
      allPokemon={allPokemon}
      myPokemon={myPokemon}
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

test('PokemonList isMyPokemon returns true when pokemon name is my pokemon', () => {
  const pokemonList = new PokemonList();
  expect(pokemonList.isMyPokemon(myPokemon, allPokemon[0].name)).toBe(true);
});

test('PokemonList isMyPokemon returns false when pokemon name is not my pokemon', () => {
  const pokemonList = new PokemonList();
  expect(pokemonList.isMyPokemon(myPokemon, 'bulbasar')).toBe(false);
});
