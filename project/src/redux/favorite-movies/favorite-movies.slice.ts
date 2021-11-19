import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '../api';
import { ActionType, ApiDataStatus, ApiEndpoint } from '../../const';
import { adaptMovieDataToClient } from '../../utils/adapters/movie-adapter';

import type { Movie } from '../../types/movie';
import type { ApiMovieData } from '../../types/api';

type FavoriteMoviesSliceState = {
  favoriteMovies: Movie[] | [];
  favoriteMoviesStatus: ApiDataStatus;
  favoriteMoviesError: string | null;
};

const initialState: FavoriteMoviesSliceState = {
  favoriteMovies: [],
  favoriteMoviesStatus: ApiDataStatus.Idle,
  favoriteMoviesError: null,
};

export const fetchFavoriteMovies = createAsyncThunk<Movie[]>(ActionType.FetchFavoriteMovies, async () => {
  const { data } = await api.get<ApiMovieData[]>(ApiEndpoint.FavoriteMovies);
  const adaptedData = data.map((movie) => adaptMovieDataToClient(movie));

  return adaptedData;
});

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    updateFavoriteMovies: (state, action: PayloadAction<Movie>) => {
      const newMovie = action.payload;
      const index = state.favoriteMovies.findIndex((movie) => movie.id === newMovie.id);

      if (index !== -1) {
        state.favoriteMovies[index] = newMovie;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteMovies.pending, (state) => {
        state.favoriteMoviesStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        const movies = action.payload;

        state.favoriteMovies = movies;
        state.favoriteMoviesStatus = ApiDataStatus.Success;
        state.favoriteMoviesError = null;
      })
      .addCase(fetchFavoriteMovies.rejected, (state) => {
        state.favoriteMoviesStatus = ApiDataStatus.Failed;
      });
  },
});

export const { updateFavoriteMovies } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
