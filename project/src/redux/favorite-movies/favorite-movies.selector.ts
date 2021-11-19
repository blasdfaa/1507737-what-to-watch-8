import { createSelector } from 'reselect';
import { ApiDataStatus } from '../../const';

import type { Movie } from '../../types/movie';
import type { RootState } from '../store';

export const getFavoriteMoviesFetchStatus = (state: RootState): ApiDataStatus =>
  state.FAVORITE_MOVIES.favoriteMoviesStatus;

export const getFavoriteMovies = (state: RootState): Movie[] => state.FAVORITE_MOVIES.favoriteMovies;

export const favoriteMoviesSelector = createSelector(getFavoriteMovies, (favoriteMovies) =>
  favoriteMovies.filter((movie) => movie.isFavorite),
);
