import { createSelector } from 'reselect';

import { ApiDataStatus } from '../../const';
import { filterMoviesByGenre } from '../../utils/common/filter-movies-on-genre';

import type { Movie, MovieGenre } from '../../types/movie';
import type { RootState } from '../store';

export const getMoviesDataStatus = (state: RootState): ApiDataStatus => state().ALL_MOVIES_DATA.moviesStatus;
export const getAllMoviesItems = (state: RootState): Movie[] | [] => state().ALL_MOVIES_DATA.movies;
export const getSelectedGenre = (state: RootState): MovieGenre => state().ALL_MOVIES_DATA.selectedGenre;

export const filteredMoviesByGenreSelector = createSelector(
  getAllMoviesItems,
  getSelectedGenre,
  (movies, currentGenre) => filterMoviesByGenre(movies, currentGenre),
);
