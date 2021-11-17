import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { redirect } from './middlewares/redirect';
import favoriteMoviesSliceReducer from './favorite-movies/favorite-movies.slice';
import movieSliceReducer from './movie/movie.slice';
import promoMovieSliceReducer from './promo-movie/promo-movie.slice';
import userProcessSliceReducer from './user-process/user-process.slice';

const rootReducer = combineReducers({
  ALL_MOVIES_DATA: movieSliceReducer,
  PROMO_MOVIE: promoMovieSliceReducer,
  FAVORITE_MOVIES: favoriteMoviesSliceReducer,
  USER_PROCESS: userProcessSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
