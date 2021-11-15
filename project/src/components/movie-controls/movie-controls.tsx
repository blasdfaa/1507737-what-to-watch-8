import { ApiDataStatus } from '../../const';
import useAppDispatch from '../../hooks/use-app-dispatch';
import useAppSelector from '../../hooks/use-app-selector';
import { getFavoriteToggleStatus } from '../../redux/movie/movie.selector';
import { toggleFavoriteStatus } from '../../redux/movie/movie.slice';

import { Movie } from '../../types/movie';

type MovieControlsProps = {
  movie: Movie | null;
  full?: boolean;
  onPlayBtnClick: () => void;
};

function MovieControls({ movie, full, onPlayBtnClick }: MovieControlsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const favoriteMovieToggleStatus = useAppSelector(getFavoriteToggleStatus);

  const handleChangeFavoriteStatus = () => {
    if (movie) {
      dispatch(toggleFavoriteStatus(movie));
    }
  };

  const isMovieFavorite = movie && movie.isFavorite;
  const isLoadingToggleStatus = favoriteMovieToggleStatus === ApiDataStatus.Loading;

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={onPlayBtnClick}>
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
      {full && (
        <a href="add-review.html" className="btn film-card__button">
          Add review
        </a>
      )}
    </div>
  );
}

export default MovieControls;
