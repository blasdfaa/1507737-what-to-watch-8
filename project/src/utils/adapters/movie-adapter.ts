import type { ApiMovieData } from '../../types/api';
import type { Movie } from '../../types/movie';

export const adaptMovieDataToClient = (movie: ApiMovieData): Movie => ({
  id: movie.id,
  title: movie.name,
  posterImage: movie['poster_image'],
  previewImage: movie['preview_image'],
  backgroundImage: movie['background_image'],
  backgroundColor: movie['background_color'],
  videoLink: movie['video_link'],
  previewVideoLink: movie['preview_video_link'],
  description: movie.description,
  rating: movie.rating,
  scoresCount: movie['scores_count'],
  director: movie.director,
  starring: movie.starring,
  runTime: movie['run_time'],
  genre: movie.genre,
  releasedYear: movie.released,
  isFavorite: movie['is_favorite'],
});

export const adaptMovieDataToServer = (movie: Movie): ApiMovieData => ({
  id: movie.id,
  name: movie.title,
  'poster_image': movie.posterImage,
  'preview_image': movie.previewImage,
  'background_image': movie.backgroundImage,
  'background_color': movie.backgroundColor,
  'video_link': movie.videoLink,
  'preview_video_link': movie.previewVideoLink,
  description: movie.description,
  rating: movie.rating,
  'scores_count': movie.scoresCount,
  director: movie.director,
  starring: movie.starring,
  'run_time': movie.runTime,
  genre: movie.genre,
  released: movie.releasedYear,
  'is_favorite': movie.isFavorite,
});
