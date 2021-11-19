import { useHistory } from 'react-router';

import { ApiDataStatus, AppRoutes } from '../../const';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { getFavoriteToggleStatus } from '../../redux/movie/movie.selector';
import { toggleFavoriteStatus } from '../../redux/movie/movie.slice';

import { Movie } from '../../types/movie';

type MovieControlsProps = {
  movie: Movie | null;
  isFull?: boolean;
};

function MovieControls({ movie, isFull }: MovieControlsProps): JSX.Element {
  const history = useHistory();
  const dispatch = useTypedDispatch();

  const favoriteMovieToggleStatus = useTypedSelector(getFavoriteToggleStatus);

  const handleChangeFavoriteStatus = () => {
    if (movie) {
      dispatch(toggleFavoriteStatus(movie));
    }
  };

  const handlePlayClick = () => {
    if (movie) {
      history.push(`${AppRoutes.Player}/${movie.id}`);
    }
  };

  const isMovieFavorite = movie && movie.isFavorite;
  const isLoadingToggleStatus = favoriteMovieToggleStatus === ApiDataStatus.Loading;

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
      {isFull && (
        <a href="add-review.html" className="btn film-card__button">
          Add review
        </a>
      )}
    </div>
  );
}

export default MovieControls;
