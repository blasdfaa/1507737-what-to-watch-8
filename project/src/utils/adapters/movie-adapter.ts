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
