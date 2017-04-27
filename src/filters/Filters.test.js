import React from 'react';
import renderer from 'react-test-renderer';
import Filters from './Filters';

const mockHandleSearchTextInput = jest.fn();
const mockHandleOnMyPokemonInput = jest.fn();

test('Filters renders filters and handle data change', () => {
  const component = renderer.create(
    <Filters
      searchText="pickachu"
      myPokemonOnly={true}
      onSearchTextInput={mockHandleSearchTextInput}
      onMyPokemonInput={mockHandleOnMyPokemonInput}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const searchTextInput = tree.children[0].children[0];
  searchTextInput.props.onChange({
    target: {
      value: 'bulbasar',
    },
  });
  expect(mockHandleSearchTextInput.mock.calls.length).toBe(1);
  expect(mockHandleSearchTextInput.mock.calls[0][0]).toBe('bulbasar');

  const myPokemonOnlyCheckboxInput = tree.children[1].children[0].children[0];
  myPokemonOnlyCheckboxInput.props.onChange({
    target: {
      checked: false,
    },
  });
  expect(mockHandleOnMyPokemonInput.mock.calls.length).toBe(1);
  expect(mockHandleOnMyPokemonInput.mock.calls[0][0]).toBe(false);
});
