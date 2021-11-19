import { createSelector } from 'reselect';

import { ApiDataStatus } from '../../const';
import { filterMoviesByGenre } from '../../utils/common/filter-movies-on-genre';

import type { Movie, MovieGenre } from '../../types/movie';
import type { RootState } from '../store';

export const getMoviesFetchStatus = (state: RootState): ApiDataStatus =>
  state.ALL_MOVIES_DATA.allMoviesFetchStatus;

export const getMovieFetchStatus = (state: RootState): ApiDataStatus =>
  state.ALL_MOVIES_DATA.movieFetchStatus;

export const getAllMoviesItems = (state: RootState): Movie[] | [] => state.ALL_MOVIES_DATA.allMovies;

export const getMovie = (state: RootState): Movie | null => state.ALL_MOVIES_DATA.movie;

export const getSelectedGenre = (state: RootState): MovieGenre => state.ALL_MOVIES_DATA.selectedGenre;

export const getFavoriteToggleStatus = (state: RootState): ApiDataStatus =>
  state.ALL_MOVIES_DATA.toggleFavoriteFetchStatus;

export const filteredMoviesByGenreSelector = createSelector(
  getAllMoviesItems,
  getSelectedGenre,
  (movies, currentGenre) => filterMoviesByGenre(movies, currentGenre),
);
