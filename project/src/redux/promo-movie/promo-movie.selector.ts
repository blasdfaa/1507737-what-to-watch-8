import { ApiDataStatus } from '../../const';

import type { RootState } from '../store';
import type { Movie } from '../../types/movie';

export const getPromoMovie = (state: RootState): Movie | null => state.PROMO_MOVIE.promoMovie;

export const getPromoMovieFetchStatus = (state: RootState): ApiDataStatus =>
  state.PROMO_MOVIE.promoMovieStatus;

export const getPromoMovieFavoriteStatus = (state: RootState): boolean | undefined =>
  state.PROMO_MOVIE.promoMovie?.isFavorite;
