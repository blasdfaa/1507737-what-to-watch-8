import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

import { ActionType, ApiEndpoint } from '../../const';

import type { MovieReview } from '../../types/review';

export const fetchReviews = createAsyncThunk<MovieReview[], number>(
  ActionType.FetchReviews,
  async (movieId) => {
    const { data } = await api.get<MovieReview[]>(`${ApiEndpoint.Review}/${movieId}`);

    return data;
  },
);
