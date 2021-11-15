import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ActionType, ApiDataStatus, ApiEndpoint } from '../../const';
import { adaptMovieDataToClient } from '../../utils/adapters/movie-adapter';
import api from '../api';

import type { ApiMovieData } from '../../types/api';
import type { Movie } from '../../types/movie';

type PromoMovieSliceState = {
  promoMovie: Movie | null;
  promoMovieStatus: ApiDataStatus;
  promoMovieError: string | null;
};

const initialState: PromoMovieSliceState = {
  promoMovie: null,
  promoMovieStatus: ApiDataStatus.Idle,
  promoMovieError: null,
};

export const fetchPromoMovie = createAsyncThunk<Movie>(ActionType.FetchPromoMovie, async () => {
  const { data } = await api.get<ApiMovieData>(ApiEndpoint.PromoMovie);
  const adaptedData = adaptMovieDataToClient(data);

  return adaptedData;
});

export const promoMovieSlice = createSlice({
  name: 'promoMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoMovie.pending, (state) => {
        state.promoMovieStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchPromoMovie.fulfilled, (state, action) => {
        const movies = action.payload;

        state.promoMovie = movies;
        state.promoMovieStatus = ApiDataStatus.Success;
        state.promoMovieError = null;
      })
      .addCase(fetchPromoMovie.rejected, (state) => {
        state.promoMovieStatus = ApiDataStatus.Failed;
      });
  },
});

export default promoMovieSlice.reducer;
