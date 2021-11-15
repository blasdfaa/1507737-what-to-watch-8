import { Movie, MovieGenre } from '../../types/movie';

export const filterMoviesByGenre = (movies: Movie[], genre: MovieGenre): Movie[] => {
  const defaultMovies = [...movies];

  switch (genre) {
    case 'All genres':
      return defaultMovies;
    case 'Comedies':
      return movies.filter((movie) => movie.genre === 'Comedy');
    case 'Crime':
      return movies.filter((movie) => movie.genre === 'Crime');
    case 'Documentary':
      return movies.filter((movie) => movie.genre === 'Documentary');
    case 'Dramas':
      return movies.filter((movie) => movie.genre === 'Drama');
    case 'Horror':
      return movies.filter((movie) => movie.genre === 'Horror');
    case 'Kids & Family':
      return movies.filter((movie) => movie.genre === 'Kids & Family');
    case 'Romance':
      return movies.filter((movie) => movie.genre === 'Romance');
    case 'Sci-Fi':
      return movies.filter((movie) => movie.genre === 'Sci-Fi');
    case 'Thrillers':
      return movies.filter((movie) => movie.genre === 'Thriller');
    default:
      return genre;
  }
};
