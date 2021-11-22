import { createSlice } from '@reduxjs/toolkit';

import { ApiDataStatus } from '../../const';
import { fetchReviews, sendReview } from './review.async';
import { changeReviewSendingStatus } from './review.action';

import type { MovieReview } from '../../types/review';

type ReviewSliceState = {
  reviews: MovieReview[] | [];
  loadingStatus: ApiDataStatus;
  reviewSendingStatus: ApiDataStatus;
  error: string | undefined;
};

const initialState: ReviewSliceState = {
  reviews: [],
  loadingStatus: ApiDataStatus.Idle,
  reviewSendingStatus: ApiDataStatus.Idle,
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
      })
      .addCase(sendReview.pending, (state) => {
        state.reviewSendingStatus = ApiDataStatus.Loading;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        const newReviews = action.payload;

        state.reviews = newReviews;
        state.reviewSendingStatus = ApiDataStatus.Idle;
      })
      .addCase(sendReview.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.reviews = [];
        state.reviewSendingStatus = ApiDataStatus.Idle;
        state.error = errorMessage;
      })
      .addCase(changeReviewSendingStatus, (state, action) => {
        state.reviewSendingStatus = action.payload;
      }),
});

export default reviewSlice.reducer;
