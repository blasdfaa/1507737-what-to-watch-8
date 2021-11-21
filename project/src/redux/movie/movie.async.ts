import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';
import { ActionType, ApiEndpoint, AppRoutes, AuthorizationStatus } from '../../const';
import { adaptMovieDataToClient } from '../../utils/adapters/movie-adapter';
import { updateMovie } from './movie.slice';
import { redirectToRouteAction } from '../user-process/user-process.action';

import type { RootState } from '../store';
import type { ApiMovieData } from '../../types/api';
import type { Movie } from '../../types/movie';

const NOT_AUTHORIZED_ERROR_MESSAGE = 'To add a movie to your favorites, you need to log in';

export const fetchAllMovies = createAsyncThunk<Movie[]>(ActionType.FetchAllMovies, async () => {
  const { data } = await api.get<ApiMovieData[]>(ApiEndpoint.Movies);

  return data.map((movie) => adaptMovieDataToClient(movie));
});

export const fetchFavoriteMovies = createAsyncThunk<Movie[]>(ActionType.FetchFavoriteMovies, async () => {
  const { data } = await api.get<ApiMovieData[]>(ApiEndpoint.FavoriteMovies);

  return data.map((movie) => adaptMovieDataToClient(movie));
});

export const fetchPromoMovie = createAsyncThunk<Movie>(ActionType.FetchPromoMovie, async () => {
  const { data } = await api.get<ApiMovieData>(ApiEndpoint.PromoMovie);

  return adaptMovieDataToClient(data);
});

export const fetchMovieById = createAsyncThunk<Movie, number>(ActionType.FetchMovieById, async (movieId) => {
  const { data } = await api.get<ApiMovieData>(`${ApiEndpoint.Movies}/${movieId}`);

  return adaptMovieDataToClient(data);
});

export const toggleFavoriteMovieFlag = createAsyncThunk<
  Movie,
  Movie,
  { state: RootState; rejectValue: string }
>(ActionType.ToggleFavoriteStatus, async (movie, { getState, dispatch, rejectWithValue }) => {
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

    dispatch(updateMovie(adaptedData));

    return adaptedData;
  } catch (e) {
    // TODO: Вернуть ошибку из axios'a
    return rejectWithValue('error');
  }
});
