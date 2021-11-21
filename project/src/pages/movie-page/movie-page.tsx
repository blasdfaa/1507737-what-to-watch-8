import React from 'react';
import { useParams } from 'react-router';

import AppHeader from '../../components/app-header/app-header';
import MovieControls from '../../components/movie-controls/movie-controls';
import UserBlock from '../../components/user-block/user-block';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import MovieInfoTabs from '../../components/movie-info-tabs/movie-info-tabs';
import MovieInfoOverview from '../../components/movie-info-overview/movie-info-overview';
import MovieInfoDetails from '../../components/movie-info-details/movie-info-details';
import MovieInfoReviews from '../../components/movie-info-reviews/movie-info-reviews';
import { fetchMovieById } from '../../redux/movie/movie.async';
import { oneMovieSelector } from '../../redux/movie/movie.selector';
import { fetchReviews } from '../../redux/review/review.async';
import { reviewSelector } from '../../redux/review/review.selector';

type UseParams = {
  id: string;
};

function MoviePage(): JSX.Element {
  const { id: movieId } = useParams<UseParams>();
  const dispatch = useTypedDispatch();

  const movie = useTypedSelector(oneMovieSelector);
  const reviews = useTypedSelector(reviewSelector);

  React.useEffect(() => {
    dispatch(fetchMovieById(+movieId));
    dispatch(fetchReviews(+movieId));
  }, []);

  return (
    <>
      <section className="film-card film-card--full" style={{ backgroundColor: `${movie?.backgroundColor}` }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie?.backgroundImage} alt={movie?.title} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <AppHeader className="film-card__head">
            <UserBlock />
          </AppHeader>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie?.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie?.genre}</span>
                <span className="film-card__year">{movie?.releasedYear}</span>
              </p>
              <MovieControls movie={movie} isFull />
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movie?.posterImage} alt={`${movie?.title} poster`} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <MovieInfoTabs>
                <MovieInfoOverview movie={movie} label="Overview" />
                <MovieInfoDetails movie={movie} label="Details" />
                <MovieInfoReviews reviews={reviews} label="Reviews" />
              </MovieInfoTabs>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {/* <MoviesList movies={} /> */}
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MoviePage;
