import React from 'react';
import renderer from 'react-test-renderer';
import PokemonDetail from './PokemonDetail';

const pokemon = {
  name: 'pikachu',
  weight: 100,
  height: 100,
  base_experience: 100,
  order: 20,
  species: {
    name: 'pikachu',
  },
  abilities: [
    {
      ability: {
        name: 'thunder',
      },
    },
  ],
  forms: [
    {
      name: 'pikachu',
    },
  ],
};

test('PokemonDetail renders pokemon details', () => {
  const component = renderer.create(
    <PokemonDetail pokemon={pokemon} show={true} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
