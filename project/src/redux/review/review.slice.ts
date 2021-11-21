import { createSlice } from '@reduxjs/toolkit';

import { ApiDataStatus } from '../../const';
import { fetchReviews } from './review.async';

import type { MovieReview } from '../../types/review';

type ReviewSliceState = {
  reviews: MovieReview[] | [];
  loadingStatus: ApiDataStatus;
  error: string | undefined;
};

const initialState: ReviewSliceState = {
  reviews: [],
  loadingStatus: ApiDataStatus.Idle,
  error: undefined,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loadingStatus = ApiDataStatus.Loading;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const reviews = action.payload;

        state.reviews = reviews;
        state.loadingStatus = ApiDataStatus.Success;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        const ErrorMessage = action.payload;

        state.loadingStatus = ApiDataStatus.Failed;
        state.error = ErrorMessage;
      }),
});

export default reviewSlice.reducer;
