import movieReducer, {setSearchTerm, toggleFavorite} from '../movieSlice';

describe('movieReducer', () => {
  it('should handle setSearchTerm', () => {
    const initialState = {
      searchTerm: '',
      movies: [],
      page: 1,
      loading: false,
      error: null,
      favorites: [],
    };
    const action = setSearchTerm('Batman');
    const nextState = movieReducer(initialState, action);

    expect(nextState.searchTerm).toBe('Batman');
    expect(nextState.page).toBe(1);
    expect(nextState.movies).toEqual([]);
    expect(nextState.favorites).toEqual([]);
  });

  it('should handle toggleFavorite by adding a new favorite', () => {
    const initialState = {
      searchTerm: '',
      movies: [],
      page: 1,
      loading: false,
      error: null,
      favorites: [],
    };
    const movie = {
      imdbID: 'tt0372784',
      Title: 'Batman Begins',
      Year: '2005',
      Poster: 'url-to-poster',
    };
    const action = toggleFavorite(movie);
    const nextState = movieReducer(initialState, action);

    expect(nextState.favorites).toContainEqual(movie);
  });

  it('should handle toggleFavorite by removing an existing favorite', () => {
    const movie = {
      imdbID: 'tt0372784',
      Title: 'Batman Begins',
      Year: '2005',
      Poster: 'url-to-poster',
    };
    const initialState = {
      searchTerm: '',
      movies: [],
      page: 1,
      loading: false,
      error: null,
      favorites: [movie],
    };
    const action = toggleFavorite(movie);
    const nextState = movieReducer(initialState, action);

    expect(nextState.favorites).not.toContainEqual(movie);
  });

  it('should handle toggleFavorite by removing a favorite that was just added', () => {
    const movie = {
      imdbID: 'tt0372784',
      Title: 'Batman Begins',
      Year: '2005',
      Poster: 'url-to-poster',
    };
    const initialState = {
      searchTerm: '',
      movies: [],
      page: 1,
      loading: false,
      error: null,
      favorites: [],
    };
    let nextState = movieReducer(initialState, toggleFavorite(movie));
    nextState = movieReducer(nextState, toggleFavorite(movie));

    expect(nextState.favorites).not.toContainEqual(movie);
  });
});
