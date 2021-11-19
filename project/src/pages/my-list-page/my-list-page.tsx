import React from 'react';
import { Redirect } from 'react-router';

import { ApiDataStatus, AppRoutes, AuthorizationStatus } from '../../const';
import AppFooter from '../../components/app-footer/app-footer';
import AppHeader from '../../components/app-header/app-header';
import MoviesList from '../../components/movies-list/movies-list';
import UserBlock from '../../components/user-block/user-block';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import {
  favoriteMoviesSelector,
  getFavoriteMoviesFetchStatus,
} from '../../redux/favorite-movies/favorite-movies.selector';
import { fetchFavoriteMovies } from '../../redux/favorite-movies/favorite-movies.slice';
import { getAuthorizationStatus } from '../../redux/user-process/user-process.selector';

function MyListPage(): JSX.Element {
  const dispatch = useTypedDispatch();

  const userAuthStatus = useTypedSelector(getAuthorizationStatus);
  const favoirteMoviesFetchStatus = useTypedSelector(getFavoriteMoviesFetchStatus);
  const favoriteMovies = useTypedSelector(favoriteMoviesSelector);

  React.useEffect(() => {
    if (favoirteMoviesFetchStatus === ApiDataStatus.Idle) {
      dispatch(fetchFavoriteMovies());
    }
  }, [favoirteMoviesFetchStatus]);

  return (
    <>
      {userAuthStatus === AuthorizationStatus.NoAuth && <Redirect to={AppRoutes.Login} />}
      {userAuthStatus === AuthorizationStatus.Auth && (
        <div className="user-page">
          <AppHeader className="user-page__head">
            <h1 className="page-title user-page__title">My list</h1>
            <UserBlock />
          </AppHeader>

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <MoviesList movies={favoriteMovies} />
          </section>

          <AppFooter />
        </div>
      )}
    </>
  );
}

export default MyListPage;
