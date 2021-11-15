import { ApiDataStatus } from '../../const';

import type { RootState } from '../store';
import type { Movie } from '../../types/movie';

export const getPromoMovie = (state: RootState): Movie | null => state().PROMO_MOVIE.promoMovie;

export const getPromoMovieLoadingStatus = (state: RootState): ApiDataStatus =>
  state().PROMO_MOVIE.promoMovieStatus;
