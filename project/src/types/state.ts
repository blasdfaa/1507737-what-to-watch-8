import { MovieReview } from './review';
import { Movie, MovieGenre } from './movie';

export type MoviesState = {
  items: Movie[] | [];
  selectedGenre: MovieGenre;
  error: string | null;
  isDataLoadded: boolean;
  reviews: MovieReview[] | [];
};

export type GlobalState = {
  movies: MoviesState;
};
