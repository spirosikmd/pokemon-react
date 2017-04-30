import React from 'react';
import renderer from 'react-test-renderer';
import PokemonCard from './PokemonCard';

const pokemon = {
  name: 'pikachu',
};

const mockHandleOnPokemonClick = jest.fn();
const mockHandleOnCatchClick = jest.fn();

test('PokemonRow renders pokemon name catch button and handle data change', () => {
  const component = renderer.create(
    <PokemonCard
      pokemon={pokemon}
      onPokemonClick={mockHandleOnPokemonClick}
      onCatchClick={mockHandleOnCatchClick}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const name = tree.children[0];
  name.props.onClick();
  expect(mockHandleOnPokemonClick.mock.calls.length).toBe(1);
  expect(mockHandleOnPokemonClick.mock.calls[0][0]).toBe('pikachu');

  const catchPokemon = tree.children[1];
  catchPokemon.props.onClick();
  expect(mockHandleOnCatchClick.mock.calls.length).toBe(1);
  expect(mockHandleOnCatchClick.mock.calls[0][0]).toBe('pikachu');
});

test('PokemonRow renders a "catch!" when pokemon is not my pokemon and style color red', () => {
  const component = renderer.create(
    <PokemonCard pokemon={pokemon} isMyPokemon={false} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PokemonRow renders a "set free.." when pokemon is my pokemon', () => {
  const component = renderer.create(
    <PokemonCard pokemon={pokemon} isMyPokemon={true} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PokemonRow getStyle returns empty object when isMyPokemon is false', () => {
  const pokemonRow = new PokemonCard();
  expect(pokemonRow.getStyle(false)).toEqual({});
});

test('PokemonRow getStyle returns style with color red when isMyPokemon is true', () => {
  const pokemonRow = new PokemonCard();
  expect(pokemonRow.getStyle(true)).toEqual({
    color: 'red',
  });
});
