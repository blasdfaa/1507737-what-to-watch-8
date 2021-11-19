import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionType, ApiDataStatus, ApiEndpoint, AppRoutes, AuthorizationStatus } from '../../const';
import { adaptMovieDataToClient } from '../../utils/adapters/movie-adapter';
import api from '../api';
import { redirectToRouteAction } from '../user-process/user-process.action';

import type { Movie, MovieGenre } from '../../types/movie';
import type { ApiMovieData } from '../../types/api';
import type { RootState } from '../store';
import { updatePromoMovie } from '../promo-movie/promo-movie.slice';
import { updateFavoriteMovies } from '../favorite-movies/favorite-movies.slice';

const DEFAULT_SELECTED_GENRE = 'All genres';
const NOT_AUTHORIZED_ERROR_MESSAGE = 'To add a movie to your favorites, you need to log in';

type MovieSliceState = {
  allMovies: Movie[] | [];
  movie: Movie | null;
  allMoviesFetchStatus: ApiDataStatus;
  movieFetchStatus: ApiDataStatus;
  toggleFavoriteFetchStatus: ApiDataStatus;
  error: string | undefined;
  selectedGenre: MovieGenre;
};

const initialState: MovieSliceState = {
  allMovies: [],
  movie: null,
  allMoviesFetchStatus: ApiDataStatus.Idle,
  movieFetchStatus: ApiDataStatus.Idle,
  toggleFavoriteFetchStatus: ApiDataStatus.Idle,
  error: undefined,
  selectedGenre: DEFAULT_SELECTED_GENRE,
};

export const fetchAllMovies = createAsyncThunk<Movie[]>(ActionType.FetchAllMovies, async () => {
  const { data } = await api.get<ApiMovieData[]>(ApiEndpoint.Movies);
  const adaptedData = data.map((movie) => adaptMovieDataToClient(movie));

  return adaptedData;
});

export const fetchMovieById = createAsyncThunk<Movie, number>(ActionType.FetchMovieById, async (movieId) => {
  const { data } = await api.get<ApiMovieData>(`${ApiEndpoint.Movies}/${movieId}`);
  const adaptedData = adaptMovieDataToClient(data);

  return adaptedData;
});

export const toggleFavoriteStatus = createAsyncThunk<Movie, Movie, { state: RootState; rejectValue: string }>(
  ActionType.ToggleFavoriteStatus,
  async (movie, { getState, dispatch, rejectWithValue }) => {
    const userAuthStatus = getState().USER_PROCESS.authorizationStatus;

    if (userAuthStatus === AuthorizationStatus.NoAuth || userAuthStatus === AuthorizationStatus.Unknown) {
      await dispatch(redirectToRouteAction(AppRoutes.Login));
      return rejectWithValue(NOT_AUTHORIZED_ERROR_MESSAGE);
    }

    try {
      const currentMovie = movie;
      const isMovieFavorite = currentMovie.isFavorite;

      const { data } = await api.post<ApiMovieData>(
        `${ApiEndpoint.FavoriteMovies}/${currentMovie.id}/${isMovieFavorite ? '0' : '1'}`,
      );
      const adaptedData = adaptMovieDataToClient(data);

      dispatch(updateMovies(adaptedData));
      dispatch(updatePromoMovie(adaptedData));
      dispatch(updateFavoriteMovies(adaptedData));

      return adaptedData;
    } catch (e) {
      // TODO: Вернуть ошибку из axios'a
      return rejectWithValue('error');
    }
  },
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<MovieGenre>) => {
      state.selectedGenre = action.payload;
    },
    updateMovies: (state, action: PayloadAction<Movie>) => {
      const newMovie = action.payload;
      const index = state.allMovies.findIndex((movie) => movie.id === newMovie.id);

      if (index !== -1) {
        state.allMovies[index] = newMovie;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.allMovies = [];
        state.allMoviesFetchStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        const movies = action.payload;

        state.allMovies = movies;
        state.allMoviesFetchStatus = ApiDataStatus.Success;
      })
      .addCase(fetchAllMovies.rejected, (state) => {
        state.allMovies = [];
        state.allMoviesFetchStatus = ApiDataStatus.Failed;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.movie = null;
        state.movieFetchStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        const movie = action.payload;

        state.movie = movie;
        state.movieFetchStatus = ApiDataStatus.Success;
      })
      .addCase(fetchMovieById.rejected, (state) => {
        state.movie = null;
        state.movieFetchStatus = ApiDataStatus.Failed;
      })
      .addCase(toggleFavoriteStatus.pending, (state) => {
        state.toggleFavoriteFetchStatus = ApiDataStatus.Loading;
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state) => {
        state.toggleFavoriteFetchStatus = ApiDataStatus.Idle;
      })
      .addCase(toggleFavoriteStatus.rejected, (state, action) => {
        state.toggleFavoriteFetchStatus = ApiDataStatus.Idle;
        state.error = action.payload;
      });
  },
});

export const { selectGenre, updateMovies } = movieSlice.actions;
export default movieSlice.reducer;
