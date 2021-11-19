import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionType, ApiDataStatus, ApiEndpoint } from '../../const';
import { adaptMovieDataToClient } from '../../utils/adapters/movie-adapter';
import api from '../api';

import type { Movie, MovieGenre } from '../../types/movie';
import type { ApiMovieData } from '../../types/api';
import type { RootState } from '../store';

const DEFAULT_SELECTED_GENRE = 'All genres';

type MovieSliceState = {
  movies: Movie[] | [];
  movie: Movie | null;
  moviesStatus: ApiDataStatus;
  movieFetchStatus: ApiDataStatus;
  toggleFavoriteStatus: ApiDataStatus;
  moviesError: string | null;
  selectedGenre: MovieGenre;
};

const initialState: MovieSliceState = {
  movies: [],
  movie: null,
  moviesStatus: ApiDataStatus.Idle,
  movieFetchStatus: ApiDataStatus.Idle,
  toggleFavoriteStatus: ApiDataStatus.Idle,
  moviesError: null,
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

export const toggleFavoriteStatus = createAsyncThunk<Movie, Movie, { state: RootState }>(
  ActionType.ToggleFavoriteStatus,
  async (movie, { getState }) => {
    // Здесь проверить статус пользователя. Если не авторизован - выйти из функции
    const currentMovie = movie;
    const isMovieFavorite = currentMovie.isFavorite;

    const { data } = await api.post<ApiMovieData>(
      `${ApiEndpoint.FavoriteMovies}/${currentMovie.id}/${isMovieFavorite ? '0' : '1'}`,
    );
    const adaptedData = adaptMovieDataToClient(data);

    return adaptedData;
  },
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<MovieGenre>) => {
      state.selectedGenre = action.payload;
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const newMovie = action.payload;
      const index = state.movies.findIndex((movie) => movie.id === newMovie.id);

      if (index !== -1) {
        state.movies[index] = newMovie;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.movies = [];
        state.moviesStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        const movies = action.payload;

        state.movies = movies;
        state.moviesStatus = ApiDataStatus.Success;
      })
      .addCase(fetchAllMovies.rejected, (state) => {
        state.movies = [];
        state.moviesStatus = ApiDataStatus.Failed;
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
        state.toggleFavoriteStatus = ApiDataStatus.Loading;
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state) => {
        state.toggleFavoriteStatus = ApiDataStatus.Idle;
      })
      .addCase(toggleFavoriteStatus.rejected, (state) => {
        state.toggleFavoriteStatus = ApiDataStatus.Idle;
      });
  },
});

export const { selectGenre, updateMovie } = movieSlice.actions;
export default movieSlice.reducer;
