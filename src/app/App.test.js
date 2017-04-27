import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  let app;

  beforeEach(() => {
    app = new App();
    app.setState = jest.fn();
  });

  afterEach(() => {
    app = null;
  });

  test('renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pageCount returns the page count', () => {
    expect(app.getPageCount(100, 15)).toBe(7);
  });

  test('onGetPokemonsSuccess sets pokemons, isLoading, and count in state', () => {
    app.onGetPokemonsSuccess({
      results: [
        {
          name: 'pikachu',
        },
      ],
      count: 1,
    });
    expect(app.setState.mock.calls[0][0]).toEqual({
      pokemons: [
        {
          name: 'pikachu',
        },
      ],
      isLoading: false,
      count: 1,
    });
  });

  describe('isFavorite', () => {
    let favorite;

    beforeEach(() => {
      favorite = [
        {
          name: 'pikachu',
        },
      ];
    });

    afterEach(() => {
      favorite = null;
    });

    test('returns true when pokemon name is in favorite', () => {
      const result = app.isFavorite(favorite, 'pikachu');
      expect(result).toBe(true);
    });

    test('returns false when pokemon name is not in favorite', () => {
      const result = app.isFavorite(favorite, 'bulbasar');
      expect(result).toBe(false);
    });
  });

  test('handleCloseModal sets showPokemon to false', () => {
    app.handleCloseModal();
    expect(app.setState.mock.calls[0][0]).toEqual({
      showPokemon: false,
    });
  });

  test('handlePageChange sets selectedPage to given selected page', () => {
    app.handlePageChange({ selected: 2 });
    expect(app.setState.mock.calls[0][0]).toEqual({
      selectedPage: 2,
    });
  });

  test('handleFiltersReset resets searchText, favoriteOnly, and selectedPage', () => {
    app.handleFiltersReset();
    expect(app.setState.mock.calls[0][0]).toEqual({
      searchText: '',
      favoriteOnly: false,
      selectedPage: 0,
    });
  });

  test('handleFavoriteInput sets the new favoriteOnly and resets selectedPage', () => {
    app.handleFavoriteInput(true);
    expect(app.setState.mock.calls[0][0]).toEqual({
      favoriteOnly: true,
      selectedPage: 0,
    });
  });

  test('handleSearchTextInput sets the new searchText and resets selectedPage', () => {
    app.handleSearchTextInput('pikachu');
    expect(app.setState.mock.calls[0][0]).toEqual({
      searchText: 'pikachu',
      selectedPage: 0,
    });
  });

  test('paginatePokemons returns the paginated pokemons', () => {
    const filteredPokemons = [
      {
        name: 'pikachu',
      },
      {
        name: 'bulbasar',
      },
      {
        name: 'charmeleon',
      },
      {
        name: 'metapod',
      },
      {
        name: 'rattata',
      },
    ];
    const paginated = app.paginatePokemons(filteredPokemons, 2, 1);
    expect(paginated.length).toBe(2);
    expect(paginated[0].name).toBe('charmeleon');
    expect(paginated[1].name).toBe('metapod');
  });

  test('filterPokemons filters pokemons based on searchText and favoriteOnly', () => {
    const pokemons = [
      {
        name: 'pikachu',
      },
      {
        name: 'bulbasar',
      },
      {
        name: 'charmeleon',
      },
      {
        name: 'metapod',
      },
      {
        name: 'rattata',
      },
    ];
    const favorite = [
      {
        name: 'metapod',
      },
    ];

    let filtered = app.filterPokemons(pokemons, favorite, 'pika', false);
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('pikachu');

    filtered = app.filterPokemons(pokemons, favorite, 'e', true);
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('metapod');
  });
});
