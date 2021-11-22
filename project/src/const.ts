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

export enum AppRoutes {
  Home = '/',
  Login = '/login',
  FavoriteList = '/myList',
  Movies = '/films',
  Player = '/player',
  AddMovieReviewRoute = '/films/:id/review',
  MoviePlayerRoute = '/player/:id',
  MoviePageRoute = '/films/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ActionType {
  FetchAllMovies = 'movie/fetchAllMovies',
  FetchFavoriteMovies = 'movie/fetchFavoriteMovies',
  FetchSimilarMovies = 'movie/fetchSimilarMovies',
  FetchMovieById = 'movie/fetchMovieById',
  FetchPromoMovie = 'movie/fetchPromoMovie',
  ToggleFavoriteStatus = 'movie/toggleFavoriteStatus',
  UpdateMovie = 'movie/updateMovie',

  CheckAuthStatus = 'user/checkAuthStatus',
  RequireLogin = 'user/requireLogin',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'user/redirectToRoute',

  FetchReviews = 'review/fetchReviews',
  SendReview = 'review/sendReview',
  ChangeReviewSendingStatus = 'review/changeReviewSendingStatus',
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

export enum ErrorMessage {
  FetchAllMovies = 'Error when fetching movies list',
  FetchFavoriteMovies = 'Error when fetching favorite movies',
  FetchSimilarMovies = 'Error when fetching similar movies',
  FetchPromoMovie = 'Error when fetching promo movie',
  FetchOneMovie = 'Error when fetching movie',
  ToggleFavoriteMovieFlag = 'Error when change favorite status',
  FetchReviews = 'Error when fetching review list',
  SendReview = 'Error when send review',
  CheckAuthStatus = 'Error when checking authorization status',
  Login = 'Error when login',
  Logout = 'Error when logout',
}
