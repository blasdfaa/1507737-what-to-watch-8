import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { redirect } from './middlewares/redirect';
import userProcessReducer from './user-process/user-process.slice';
import movieReducer from './movie/movie.slice';
import reviewReducer from './review/review.slice';

const rootReducer = combineReducers({
  MOVIES: movieReducer,
  REVIEWS: reviewReducer,
  USER_PROCESS: userProcessReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
