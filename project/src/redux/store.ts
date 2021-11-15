import { configureStore } from '@reduxjs/toolkit';

import { redirect } from './middlewares/redirect';
import api from './api';
import favoriteMoviesSliceReducer from './favorite-movies/favorite-movies.slice';
import movieSliceReducer from './movie/movie.slice';
import promoMovieSliceReducer from './promo-movie/promo-movie.slice';

const store = configureStore({
  reducer: {
    ALL_MOVIES_DATA: movieSliceReducer,
    PROMO_MOVIE: promoMovieSliceReducer,
    FAVORITE_MOVIES: favoriteMoviesSliceReducer,
  },
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
