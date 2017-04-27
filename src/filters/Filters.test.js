import React from 'react';
import renderer from 'react-test-renderer';
import Filters from './Filters';

const mockHandleSearchTextInput = jest.fn();
const mockHandleOnFavoriteInput = jest.fn();

test('Filters renders filters and handle data change', () => {
  const component = renderer.create(
    <Filters
      searchText="pickachu"
      favoriteOnly={true}
      onSearchTextInput={mockHandleSearchTextInput}
      onFavoriteInput={mockHandleOnFavoriteInput}
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

  const favoriteOnlyCheckboxInput = tree.children[1].children[0].children[0];
  favoriteOnlyCheckboxInput.props.onChange({
    target: {
      checked: false,
    },
  });
  expect(mockHandleOnFavoriteInput.mock.calls.length).toBe(1);
  expect(mockHandleOnFavoriteInput.mock.calls[0][0]).toBe(false);
});
