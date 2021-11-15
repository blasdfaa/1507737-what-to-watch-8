export const ERROR_404_MESSAGE = 'Page not found';
export const FETCH_MOVIES_ERROR_MESSAGE = 'Error loading movies';

export const genresNames = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
] as const;

// export enum Genres {
//   AllGenres = 'All Genres',
//   Comedies = 'Comedies',
//   Crime = 'Crime',
//   Documentary = ' Documentary',
//   Dramas = 'Dramas',
// }

export enum AppRoutes {
  Home = '/',
  Login = '/login',
  FavoriteList = '/myList',
  Movies = '/films',
  MoviePage = '/films/:id',
  AddMovieReviewPage = '/films/:id/review',
  MoviePlayer = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ActionType {
  FetchAllMovies = 'movie/getAllMovies',
  ToggleFavoriteStatus = 'movie/toggleFavoriteStatus',

  FetchPromoMovie = 'promoMovie/fetchPromoMovie',

  FetchFavoriteMovies = 'favoriteMovie/fetchFavoriteMovie',

  RedirectToRoute = 'user/redirectToRoute',
}

export enum ApiEndpoint {
  Login = '/login',
  Logout = '/logout',
  Movies = '/films',
  PromoMovie = '/promo',
  FavoriteMovies = '/favorite',
  Review = '/comments',
}

export enum ApiDataStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export enum HttpCode {
  Unauthorized = 401,
  NotFound = 404,
}