import {createSlice} from '@reduxjs/toolkit';
import {fetchMovies} from '../utils/api';

interface MovieState {
  movies: any[];
  loading: boolean;
  error: string | null;
  page: number;
  searchTerm: string;
  favorites: any[];
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  page: 1,
  searchTerm: '',
  favorites: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
      state.movies = [];
    },
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const isFavorite = state.favorites.some(
        fav => fav.imdbID === movie.imdbID,
      );
      if (isFavorite) {
        state.favorites = state.favorites.filter(
          fav => fav.imdbID !== movie.imdbID,
        );
      } else {
        state.favorites.push(movie);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        const movies = action.payload?.Search || [];
        state.movies = [...state.movies, ...movies];
        state.page += 1;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const {setSearchTerm, toggleFavorite} = movieSlice.actions;

export default movieSlice.reducer;
