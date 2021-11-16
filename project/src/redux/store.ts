import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { redirect } from './middlewares/redirect';
import api from './api';
import favoriteMoviesSliceReducer from './favorite-movies/favorite-movies.slice';
import movieSliceReducer from './movie/movie.slice';
import promoMovieSliceReducer from './promo-movie/promo-movie.slice';

const rootReducer = combineReducers({
  ALL_MOVIES_DATA: movieSliceReducer,
  PROMO_MOVIE: promoMovieSliceReducer,
  FAVORITE_MOVIES: favoriteMoviesSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }).concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
