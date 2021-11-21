import React from 'react';

import { getMovieRuntime } from '../../utils/dates/date';

import type { Movie } from '../../types/movie';

type MovieInfoDetailsProps = {
  movie: Movie | null;
};

function MovieInfoDetails({ movie }: MovieInfoDetailsProps): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      {movie && (
        <>
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{movie.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {movie.starring.map((star, index) => (
                  <React.Fragment key={`${star}_name`}>
                    {star}
                    {index < movie.starring.length - 1 && ', '}
                    {index < movie.starring.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{getMovieRuntime(movie.runTime)}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{movie.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{movie.releasedYear}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieInfoDetails;
