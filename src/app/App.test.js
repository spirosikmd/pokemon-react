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
    app.onGetAllPokemonSuccess({
      results: [
        {
          name: 'pikachu',
        },
      ],
      count: 1,
    });
    expect(app.setState.mock.calls[0][0]).toEqual({
      allPokemon: [
        {
          name: 'pikachu',
        },
      ],
      isLoading: false,
      count: 1,
    });
  });

  describe('isMyPokemon', () => {
    let myPokemon;

    beforeEach(() => {
      myPokemon = [
        {
          name: 'pikachu',
        },
      ];
    });

    afterEach(() => {
      myPokemon = null;
    });

    test('returns true when pokemon name is my pokemon', () => {
      const result = app.isMyPokemon(myPokemon, 'pikachu');
      expect(result).toBe(true);
    });

    test('returns false when pokemon name is not my pokemon', () => {
      const result = app.isMyPokemon(myPokemon, 'bulbasar');
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

  test('handleFiltersReset resets searchText, myPokemonOnly, and selectedPage', () => {
    app.handleFiltersReset();
    expect(app.setState.mock.calls[0][0]).toEqual({
      searchText: '',
      myPokemonOnly: false,
      selectedPage: 0,
    });
  });

  test('handleMyPokemonInput sets the new myPokemonOnly and resets selectedPage', () => {
    app.handleMyPokemonInput(true);
    expect(app.setState.mock.calls[0][0]).toEqual({
      myPokemonOnly: true,
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
    const paginated = app.paginatePokemon(filteredPokemons, 2, 1);
    expect(paginated.length).toBe(2);
    expect(paginated[0].name).toBe('charmeleon');
    expect(paginated[1].name).toBe('metapod');
  });

  test('filterPokemons filters pokemons based on searchText and myPokemonOnly', () => {
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
    const myPokemon = [
      {
        name: 'metapod',
      },
    ];

    let filtered = app.filterPokemon(pokemons, myPokemon, 'pika', false);
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('pikachu');

    filtered = app.filterPokemon(pokemons, myPokemon, 'e', true);
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('metapod');
  });

  test('handlePerPageChange sets perPage to state', () => {
    app.handlePerPageChange(40);
    expect(app.setState.mock.calls.length).toBe(1);
    expect(app.setState.mock.calls[0][0]).toEqual({
      perPage: 40,
    });
  });
});
