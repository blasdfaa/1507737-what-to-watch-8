import useAppDispatch from '../../hooks/use-app-dispatch';
import { toggleFavoriteStatus, updateMovie } from '../../redux/movie/movie.slice';
import { Movie } from '../../types/movie';

type MovieControlsProps = {
  movie: Movie | null;
  full?: boolean;
  onPlayBtnClick: () => void;
};

function MovieControls({ movie, full, onPlayBtnClick }: MovieControlsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleChangeFavoriteStatus = () => {
    if (movie) {
      dispatch(toggleFavoriteStatus(movie));
    }
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={onPlayBtnClick}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={handleChangeFavoriteStatus}>
        {/* <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={`#${inMyList ? 'in-list' : 'add'}`} />
        </svg> */}
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