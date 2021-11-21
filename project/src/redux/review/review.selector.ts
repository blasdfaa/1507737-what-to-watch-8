import { createSelector } from 'reselect';
import { RootState } from '../store';

// init
const all = (state: RootState) => state.REVIEWS;
const reviews = (state: RootState) => all(state).reviews;

// selector

export const reviewSelector = createSelector(reviews, (items) => items);
