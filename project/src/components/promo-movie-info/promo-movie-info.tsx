import clsx from 'clsx';

import MovieControls from '../movie-controls/movie-controls';

import type { Movie } from '../../types/movie';

type PromoMovieInfoProps = {
  movie: Movie | null;
  full?: boolean;
};

function PromoMovieInfo({ movie, full }: PromoMovieInfoProps): JSX.Element {
  const filmWrapClasses = clsx('film-card__wrap', {
    'film-card__translate-top': full,
  });

  const filmPosterClasses = clsx('film-card__poster', {
    'film-card__poster--big': full,
  });

  return (
    <div className={filmWrapClasses}>
      <div className="film-card__info">
        <div className={filmPosterClasses}>
          <img src={movie?.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
        <div className="film-card__desc">
          <h2 className="film-card__title">{movie?.title}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{movie?.genre}</span>
            <span className="film-card__year">{movie?.releasedYear}</span>
          </p>
          <MovieControls movie={movie && movie} />
        </div>
      </div>
    </div>
  );
}

export default PromoMovieInfo;
