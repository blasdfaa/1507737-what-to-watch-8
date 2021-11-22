import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import api from '../api';
import { ActionType, ApiEndpoint, AppRoutes, AuthorizationStatus, ErrorMessage } from '../../const';
import { adaptMovieDataToClient } from '../../utils/adapters/movie-adapter';
import { updateMovie } from './movie.action';
import { redirectToRouteAction } from '../user-process/user-process.action';

import type { AxiosError } from 'axios';
import type { RootState } from '../store';
import type { ApiMovieData } from '../../types/api';
import type { Movie } from '../../types/movie';

const NOT_AUTHORIZED_ERROR_MESSAGE = 'To add a movie to your favorites, you need to log in';

export const fetchAllMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  ActionType.FetchAllMovies,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiMovieData[]>(ApiEndpoint.Movies);

      return data.map((movie) => adaptMovieDataToClient(movie));
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.FetchAllMovies);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchFavoriteMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  ActionType.FetchFavoriteMovies,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiMovieData[]>(ApiEndpoint.FavoriteMovies);

      return data.map((movie) => adaptMovieDataToClient(movie));
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.FetchFavoriteMovies);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchSimilarMovies = createAsyncThunk<Movie[], number, { rejectValue: string }>(
  ActionType.FetchSimilarMovies,
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiMovieData[]>(`${ApiEndpoint.Movies}/${movieId}/similar`);

      return data.map((movie) => adaptMovieDataToClient(movie));
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.FetchSimilarMovies);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchMovieById = createAsyncThunk<Movie, number, { rejectValue: string }>(
  ActionType.FetchMovieById,
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiMovieData>(`${ApiEndpoint.Movies}/${movieId}`);

      return adaptMovieDataToClient(data);
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.FetchOneMovie);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchPromoMovie = createAsyncThunk<Movie, void, { rejectValue: string }>(
  ActionType.FetchPromoMovie,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiMovieData>(ApiEndpoint.PromoMovie);

      return adaptMovieDataToClient(data);
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.FetchPromoMovie);
      return rejectWithValue(errorMessage);
    }
  },
);

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

  const currentMovie = movie;
  const isMovieFavorite = currentMovie.isFavorite;

  try {
    const { data } = await api.post<ApiMovieData>(
      `${ApiEndpoint.FavoriteMovies}/${currentMovie.id}/${isMovieFavorite ? '0' : '1'}`,
    );
    const adaptedData = adaptMovieDataToClient(data);

    dispatch(updateMovie(adaptedData));

    return adaptedData;
  } catch (e) {
    const errorMessage = (e as AxiosError).message;

    toast.error(ErrorMessage.ToggleFavoriteMovieFlag);
    return rejectWithValue(errorMessage);
  }
});
