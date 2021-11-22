import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import api from '../api';
import { ActionType, ApiDataStatus, ApiEndpoint, AppRoutes, ErrorMessage } from '../../const';
import { changeReviewSendingStatus } from './review.action';
import { redirectToRouteAction } from '../user-process/user-process.action';

import type { AxiosError } from 'axios';
import type { MovieReview, MovieReviewPost } from '../../types/review';

type SendReviewPayload = {
  review: MovieReviewPost;
  movieId: number;
};

export const fetchReviews = createAsyncThunk<MovieReview[], number, { rejectValue: string }>(
  ActionType.FetchReviews,
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.get<MovieReview[]>(`${ApiEndpoint.Review}/${movieId}`);

      return data;
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.FetchReviews);
      return rejectWithValue(errorMessage);
    }
  },
);

export const sendReview = createAsyncThunk<MovieReview[], SendReviewPayload, { rejectValue: string }>(
  ActionType.SendReview,
  async ({ review, movieId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post<MovieReview[]>(`${ApiEndpoint.Review}/${movieId}`, review);

      dispatch(changeReviewSendingStatus(ApiDataStatus.Success));
      await dispatch(redirectToRouteAction(`${AppRoutes.Movies}/${movieId}`));

      return data;
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      return rejectWithValue(errorMessage);
    }
  },
);
