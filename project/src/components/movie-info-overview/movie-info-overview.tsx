import type { Movie } from '../../types/movie';

import { getMovieRatingDescription } from '../../utils/common/get-movie-rating-description';

type MovieInfoOverviewProps = {
  movie: Movie | null;
  label: string;
};

function MovieInfoOverview({ movie, label }: MovieInfoOverviewProps): JSX.Element {
  return (
    <>
      {movie && (
        <>
          <div className="film-rating" data-label={label}>
            <div className="film-rating__score">{movie.rating.toFixed(1)}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">{getMovieRatingDescription(movie.rating)}</span>
              <span className="film-rating__count">{movie.scoresCount} ratings</span>
            </p>
          </div>
          <div className="film-card__text" data-label={label}>
            <p>{movie.description}</p>
            <p className="film-card__director">
              <strong>Director: {movie.director}</strong>
            </p>
            <p className="film-card__starring">
              <strong> Starring: {movie.starring.join(', ')}</strong>
            </p>
          </div>
        </>
      )}
      {!movie && <p>Empty</p>}
    </>
  );
}

export default MovieInfoOverview;
