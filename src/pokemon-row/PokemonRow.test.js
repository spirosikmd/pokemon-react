import React from 'react';
import renderer from 'react-test-renderer';
import PokemonRow from './PokemonRow';

const pokemon = {
  name: 'pikachu',
};

const mockHandleOnPokemonClick = jest.fn();
const mockHandleOnFavoriteClick = jest.fn();

test('PokemonRow renders pokemon name favorite button and handle data change', () => {
  const component = renderer.create(
    <PokemonRow
      pokemon={pokemon}
      onPokemonClick={mockHandleOnPokemonClick}
      onFavoriteClick={mockHandleOnFavoriteClick}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const name = tree.children[0];
  name.props.onClick();
  expect(mockHandleOnPokemonClick.mock.calls.length).toBe(1);
  expect(mockHandleOnPokemonClick.mock.calls[0][0]).toBe('pikachu');

  const favorite = tree.children[1];
  favorite.props.onClick();
  expect(mockHandleOnFavoriteClick.mock.calls.length).toBe(1);
  expect(mockHandleOnFavoriteClick.mock.calls[0][0]).toBe('pikachu');
});

test('PokemonRow renders a "*" when pokemon is not favorite and style color red', () => {
  const component = renderer.create(
    <PokemonRow pokemon={pokemon} isFavorite={false} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PokemonRow renders a "-" when pokemon is favorite', () => {
  const component = renderer.create(
    <PokemonRow pokemon={pokemon} isFavorite={true} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PokemonRow getStyle returns empty object when isFavorite is false', () => {
  const pokemonRow = new PokemonRow();
  expect(pokemonRow.getStyle(false)).toEqual({});
});

test('PokemonRow getStyle returns style with color red when isFavorite is true', () => {
  const pokemonRow = new PokemonRow();
  expect(pokemonRow.getStyle(true)).toEqual({
    color: 'red',
  });
});
