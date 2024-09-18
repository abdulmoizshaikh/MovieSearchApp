import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import Config from 'react-native-config';

const API_URL = `http://www.omdbapi.com/?apikey=${Config.OMDB_API_KEY}`;

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({searchTerm, page}: {searchTerm: string; page: number}) => {
    try {
      const response = await axios.get(
        `${API_URL}&s=${searchTerm}&page=${page}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.Error || 'Failed to fetch movies');
    }
  },
);
