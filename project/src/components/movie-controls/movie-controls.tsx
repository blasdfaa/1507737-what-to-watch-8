import React from 'react';
import { useHistory } from 'react-router';

import { ApiDataStatus, AppRoutes, AuthorizationStatus } from '../../const';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { toggleFavoriteMovieFlag } from '../../redux/movie/movie.async';
import { getFavoriteFlagChangeStatus } from '../../redux/movie/movie.selector';
import { getAuthorizationStatus } from '../../redux/user-process/user-process.selector';

import { Movie } from '../../types/movie';

type MovieControlsProps = {
  movie: Movie | null;
  isFull?: boolean;
};

function MovieControls({ movie, isFull }: MovieControlsProps): JSX.Element {
  const history = useHistory();
  const dispatch = useTypedDispatch();

  const authStatus = useTypedSelector(getAuthorizationStatus);
  const favoriteFlagChangeStatus = useTypedSelector(getFavoriteFlagChangeStatus);

  const handleChangeFavoriteStatus = async () => {
    if (movie) {
      dispatch(toggleFavoriteMovieFlag(movie));
    }
  };

  const handlePlayClick = () => {
    if (movie) {
      history.push(`${AppRoutes.Player}/${movie.id}`);
    }
  };

  const handleAddReviewClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (movie) {
      history.push(`${AppRoutes.Movies}/${movie.id}/review`, {
        from: {
          pathname: `${AppRoutes.Movies}/${movie.id}`,
          movieName: movie.title,
        },
      });
    }
  };

  const isMovieFavorite = movie && movie.isFavorite;
  const isLoadingToggleStatus = favoriteFlagChangeStatus === ApiDataStatus.Loading;

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayClick}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={handleChangeFavoriteStatus}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          {isMovieFavorite && !isLoadingToggleStatus && <use xlinkHref="#in-list" />}
          {!isMovieFavorite && !isLoadingToggleStatus && <use xlinkHref="#add" />}
          {isLoadingToggleStatus && <use xlinkHref="#btn-loader" />}
        </svg>
        <span>My list</span>
      </button>
      {authStatus === AuthorizationStatus.Auth && movie && isFull && (
        <a className="btn film-card__button" href="#!" onClick={(e) => handleAddReviewClick(e)}>
          Add review
        </a>
      )}
    </div>
  );
}

export default MovieControls;
