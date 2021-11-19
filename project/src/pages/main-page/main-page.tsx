import React from 'react';

import { ApiDataStatus } from '../../const';
import AppHeader from '../../components/app-header/app-header';
import GenresBar from '../../components/genres-bar/genres-bar';
import UserBlock from '../../components/user-block/user-block';
import AppFooter from '../../components/app-footer/app-footer';
import PromoMovieInfo from '../../components/promo-movie-info/promo-movie-info';
import useTypedSelector from '../../hooks/use-typed-selector';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import { fetchAllMovies, selectGenre } from '../../redux/movie/movie.slice';
import {
  filteredMoviesByGenreSelector,
  getAllMoviesItems,
  getMoviesFetchStatus,
  getSelectedGenre,
} from '../../redux/movie/movie.selector';
import MoviesList from '../../components/movies-list/movies-list';
import { getPromoMovie, getPromoMovieFetchStatus } from '../../redux/promo-movie/promo-movie.selector';
import { fetchPromoMovie } from '../../redux/promo-movie/promo-movie.slice';
import { getAuthorizationStatus } from '../../redux/user-process/user-process.selector';

import type { Movie, MovieGenre } from '../../types/movie';

const INITIAL_SHOWED_MOVIES_COUNT = 8;
const SHOWED_MOVIES_STEP = 8;

function MainPage(): JSX.Element {
  const dispatch = useTypedDispatch();

  const currentGenre = useTypedSelector(getSelectedGenre);
  const allMoviesFetchStatus = useTypedSelector(getMoviesFetchStatus);
  const promoMovieLoadingStatus = useTypedSelector(getPromoMovieFetchStatus);
  const moviesData = useTypedSelector(getAllMoviesItems);
  const filteredMovies = useTypedSelector(filteredMoviesByGenreSelector);
  const promoMovie = useTypedSelector(getPromoMovie);
  const userAuthStatus = useTypedSelector(getAuthorizationStatus);

  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [moviesToShow, setMoviesToShow] = React.useState<number>(INITIAL_SHOWED_MOVIES_COUNT);

  React.useEffect(() => {
    if (allMoviesFetchStatus === ApiDataStatus.Idle) {
      dispatch(fetchAllMovies());
    }
  }, [allMoviesFetchStatus]);

  React.useEffect(() => {
    if (promoMovieLoadingStatus === ApiDataStatus.Idle) {
      dispatch(fetchPromoMovie());
    }
  }, [promoMovieLoadingStatus]);

  React.useEffect(() => {
    setMovies(filteredMovies);
  }, [currentGenre, moviesData]);

  const handleChangeGenre = (e: React.SyntheticEvent, genre: MovieGenre): void => {
    e.preventDefault();

    dispatch(selectGenre(genre));
    setMoviesToShow(INITIAL_SHOWED_MOVIES_COUNT);
  };

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
