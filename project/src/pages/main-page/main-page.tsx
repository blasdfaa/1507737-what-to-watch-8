import React from 'react';

import { ApiDataStatus, AuthorizationStatus } from '../../const';
import AppHeader from '../../components/app-header/app-header';
import GenresBar from '../../components/genres-bar/genres-bar';
import UserBlock from '../../components/user-block/user-block';
import AppFooter from '../../components/app-footer/app-footer';
import PromoMovieInfo from '../../components/promo-movie-info/promo-movie-info';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import { fetchAllMovies, selectGenre } from '../../redux/movie/movie.slice';
import {
  filteredMoviesByGenreSelector,
  getAllMoviesItems,
  getMoviesDataStatus,
  getSelectedGenre,
} from '../../redux/movie/movie.selector';
import MoviesList from '../../components/movies-list/movies-list';
import { getPromoMovie, getPromoMovieLoadingStatus } from '../../redux/promo-movie/promo-movie.selector';
import { fetchPromoMovie } from '../../redux/promo-movie/promo-movie.slice';

import type { Movie, MovieGenre } from '../../types/movie';

const INITIAL_SHOWED_MOVIES_COUNT = 8;
const SHOWED_MOVIES_STEP = 8;

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentGenre = useAppSelector(getSelectedGenre);
  const allMoviesFetchStatus = useAppSelector(getMoviesDataStatus);
  const promoMovieLoadingStatus = useAppSelector(getPromoMovieLoadingStatus);
  const moviesData = useAppSelector(getAllMoviesItems);
  const filteredMovies = useAppSelector(filteredMoviesByGenreSelector);
  const promoMovie = useAppSelector(getPromoMovie);

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

  const showedMovies = movies.slice(0, moviesToShow);
  const allMoviesShowed = moviesToShow >= movies.length;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovie?.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>

        <AppHeader className="film-card__head">
          <UserBlock authorizationStatus={AuthorizationStatus.Auth} />
        </AppHeader>

        <PromoMovieInfo movie={promoMovie} />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresBar selectedGenre={currentGenre} onGenreClick={handleChangeGenre} />
          <MoviesList movies={showedMovies} />
          <div className="catalog__more">
            {!allMoviesShowed && (
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
