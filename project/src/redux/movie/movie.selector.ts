import { createSelector } from 'reselect';

import { ApiDataStatus } from '../../const';
import { filterMoviesByGenre } from '../../utils/common/filter-movies-by-genre';

import type { RootState } from '../store';
import type { MovieGenre } from '../../types/movie';

const SIMILAR_MOVIES_COUNT = 4;

// init
const all = (state: RootState) => state.MOVIES;
const allMovies = (state: RootState) => all(state).allMovies;
const favoriteMovies = (state: RootState) => all(state).favoriteMovies;
const similarMovies = (state: RootState) => all(state).similarMovies;
const promoMovie = (state: RootState) => all(state).promoMovie;
const oneMovie = (state: RootState) => all(state).oneMovie;

// get
export const getSelectedGenre = (state: RootState): MovieGenre => all(state).selectedGenre;
export const getAllMoviesLoadingStatus = (state: RootState): ApiDataStatus => allMovies(state).loadingStatus;
export const getFavoriteMoviesLoadingStatus = (state: RootState): ApiDataStatus =>
  favoriteMovies(state).loadingStatus;
export const getOneMovieLoadingStatus = (state: RootState): ApiDataStatus => oneMovie(state).loadingStatus;
export const getFavoriteFlagChangeStatus = (state: RootState): ApiDataStatus =>
  all(state).favoriteFlagChangeStatus;

// selector
export const allMoviesSelector = createSelector(allMovies, (movies) => movies.items);
export const favoriteMoviesSelector = createSelector(favoriteMovies, (movies) => movies.items);
export const similarMoviesSelector = createSelector(similarMovies, (movies) =>
  movies.items.slice(0, SIMILAR_MOVIES_COUNT),
);
export const promoMovieSelector = createSelector(promoMovie, (movie) => movie.data);
export const oneMovieSelector = createSelector(oneMovie, (movie) => movie.data);
export const filteredMoviesByGenreSelector = createSelector(
  allMoviesSelector,
  getSelectedGenre,
  (movies, currentGenre) => filterMoviesByGenre(movies, currentGenre),
);
