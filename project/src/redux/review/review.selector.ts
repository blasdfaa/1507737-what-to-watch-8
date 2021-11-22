import { createSelector } from 'reselect';

import { ApiDataStatus } from '../../const';
import { RootState } from '../store';

// init
const all = (state: RootState) => state.REVIEWS;
const reviews = (state: RootState) => all(state).reviews;

// get

export const getReviewSendingStatus = (state: RootState): ApiDataStatus => all(state).reviewSendingStatus;

// selector
export const reviewSelector = createSelector(reviews, (items) => items);
