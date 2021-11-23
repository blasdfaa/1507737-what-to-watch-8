import React from 'react';

import { fetchAllMovies, fetchPromoMovie } from '../../../redux/movie/movie.async';
import { ApiDataStatus } from '../../../const';
import AppHeader from '../../app-header/app-header';
import GenresBar from '../../genres-bar/genres-bar';
import UserBlock from '../../user-block/user-block';
import AppFooter from '../../app-footer/app-footer';
import useTypedSelector from '../../../hooks/use-typed-selector';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import { selectGenre } from '../../../redux/movie/movie.slice';
import {
  filteredMoviesByGenreSelector,
  allMoviesSelector,
  getSelectedGenre,
  getAllMoviesLoadingStatus,
  promoMovieSelector
} from '../../../redux/movie/movie.selector';
import MoviesList from '../../movies-list/movies-list';
import PromoMovieInfo from '../../promo-movie-info/promo-movie-info';

import type { Movie, MovieGenre } from '../../../types/movie';

const INITIAL_SHOWED_MOVIES_COUNT = 8;
const SHOWED_MOVIES_STEP = 8;

function MainPage(): JSX.Element {
  const dispatch = useTypedDispatch();

  const currentGenre = useTypedSelector(getSelectedGenre);
  const allMoviesLoadingStatus = useTypedSelector(getAllMoviesLoadingStatus);
  const allMovies = useTypedSelector(allMoviesSelector);
  const filteredMovies = useTypedSelector(filteredMoviesByGenreSelector);
  const promoMovie = useTypedSelector(promoMovieSelector);

  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [moviesToShow, setMoviesToShow] = React.useState<number>(INITIAL_SHOWED_MOVIES_COUNT);

  React.useEffect(() => {
    if (allMoviesLoadingStatus === ApiDataStatus.Idle) {
      dispatch(fetchAllMovies());
    }
  }, [dispatch, allMoviesLoadingStatus]);

  React.useEffect(() => {
    dispatch(fetchPromoMovie());
  }, [dispatch]);

  React.useEffect(() => {
    setMovies(filteredMovies);
  }, [currentGenre, allMovies, filteredMovies]);

  const handleChangeGenre = React.useCallback(
    (e: React.SyntheticEvent<HTMLAnchorElement>, genre: MovieGenre): void => {
      e.preventDefault();

      dispatch(selectGenre(genre));
      setMoviesToShow(INITIAL_SHOWED_MOVIES_COUNT);
    },
    [dispatch],
  );

  const handleShowMoreBtn = (): void => {
    setMoviesToShow((prevState) => prevState + SHOWED_MOVIES_STEP);
  };

  const showedMoviesCount = movies.slice(0, moviesToShow);
  const isAllMoviesShowed = moviesToShow >= movies.length;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovie?.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>

        <AppHeader className="film-card__head">
          <UserBlock />
        </AppHeader>

        <PromoMovieInfo movie={promoMovie} />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresBar selectedGenre={currentGenre} onGenreClick={handleChangeGenre} />
          <MoviesList movies={showedMoviesCount} />
          <div className="catalog__more">
            {!isAllMoviesShowed && (
              <button className="catalog__button" type="button" onClick={handleShowMoreBtn}>
                Show more
              </button>
            )}
          </div>
        </section>
        <AppFooter />
      </div>
    </>
  );
}

export default MainPage;
