import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiDataStatus } from '../../const';
import {
  fetchAllMovies,
  fetchFavoriteMovies,
  fetchMovieById,
  fetchPromoMovie,
  toggleFavoriteMovieFlag,
} from './movie.async';

import type { Movie, MovieGenre } from '../../types/movie';

const DEFAULT_SELECTED_GENRE = 'All genres';

type MovieSliceState = {
  allMovies: {
    items: Movie[] | [];
    loadingStatus: ApiDataStatus;
    error: string | undefined;
  };
  favoriteMovies: {
    items: Movie[] | [];
    loadingStatus: ApiDataStatus;
    error: string | undefined;
  };
  promoMovie: {
    data: Movie | null;
    loadingStatus: ApiDataStatus;
    error: string | undefined;
  };
  oneMovie: {
    data: Movie | null;
    loadingStatus: ApiDataStatus;
    error: string | undefined;
  };
  selectedGenre: MovieGenre;
  favoriteFlagChangeStatus: ApiDataStatus;
  error: string | undefined;
};

const initialState: MovieSliceState = {
  allMovies: {
    items: [],
    loadingStatus: ApiDataStatus.Idle,
    error: undefined,
  },
  favoriteMovies: {
    items: [],
    loadingStatus: ApiDataStatus.Idle,
    error: undefined,
  },
  promoMovie: {
    data: null,
    loadingStatus: ApiDataStatus.Idle,
    error: undefined,
  },
  oneMovie: {
    data: null,
    loadingStatus: ApiDataStatus.Idle,
    error: undefined,
  },
  selectedGenre: DEFAULT_SELECTED_GENRE,
  favoriteFlagChangeStatus: ApiDataStatus.Idle,
  error: undefined,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<MovieGenre>) => {
      state.selectedGenre = action.payload;
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const newMovie = action.payload;
      const index = state.allMovies.items.findIndex((movie) => movie.id === newMovie.id);

      if (index !== -1) {
        state.allMovies.items[index] = newMovie;
      }

      state.promoMovie.data = newMovie;
      state.oneMovie.data = newMovie;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.allMovies.items = [];
        state.allMovies.loadingStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        const movies = action.payload;

        state.allMovies.items = movies;
        state.allMovies.loadingStatus = ApiDataStatus.Success;
      })
      .addCase(fetchAllMovies.rejected, (state) => {
        state.allMovies.items = [];
        state.allMovies.loadingStatus = ApiDataStatus.Failed;
      })
      .addCase(fetchFavoriteMovies.pending, (state) => {
        state.favoriteMovies.loadingStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        const movies = action.payload;

        state.favoriteMovies.items = movies;
        state.favoriteMovies.loadingStatus = ApiDataStatus.Success;
        state.favoriteMovies.error = undefined;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.favoriteMovies.loadingStatus = ApiDataStatus.Failed;
        state.favoriteMovies.error = errorMessage;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.oneMovie.data = null;
        state.oneMovie.loadingStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        const movie = action.payload;

        state.oneMovie.data = movie;
        state.oneMovie.loadingStatus = ApiDataStatus.Idle;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.oneMovie.data = null;
        state.oneMovie.loadingStatus = ApiDataStatus.Failed;
        state.oneMovie.error = errorMessage;
      })
      .addCase(fetchPromoMovie.pending, (state) => {
        state.promoMovie.loadingStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchPromoMovie.fulfilled, (state, action) => {
        const movie = action.payload;

        state.promoMovie.data = movie;
        state.promoMovie.loadingStatus = ApiDataStatus.Success;
        state.promoMovie.error = undefined;
      })
      .addCase(fetchPromoMovie.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.promoMovie.loadingStatus = ApiDataStatus.Failed;
        state.promoMovie.error = errorMessage;
      })
      .addCase(toggleFavoriteMovieFlag.pending, (state) => {
        state.favoriteFlagChangeStatus = ApiDataStatus.Loading;
      })
      .addCase(toggleFavoriteMovieFlag.fulfilled, (state) => {
        state.favoriteFlagChangeStatus = ApiDataStatus.Idle;
      })
      .addCase(toggleFavoriteMovieFlag.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.favoriteFlagChangeStatus = ApiDataStatus.Idle;
        state.error = errorMessage;
      });
  },
});

export const { selectGenre, updateMovie } = movieSlice.actions;
export default movieSlice.reducer;
