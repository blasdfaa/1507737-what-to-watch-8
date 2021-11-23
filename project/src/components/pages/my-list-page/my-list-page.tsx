import React from 'react';
import { Redirect } from 'react-router';

import { AppRoutes, AuthorizationStatus } from '../../../const';
import AppFooter from '../../app-footer/app-footer';
import AppHeader from '../../app-header/app-header';
import MoviesList from '../../movies-list/movies-list';
import UserBlock from '../../user-block/user-block';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import useTypedSelector from '../../../hooks/use-typed-selector';
import { getAuthorizationStatus } from '../../../redux/user-process/user-process.selector';
import { favoriteMoviesSelector } from '../../../redux/movie/movie.selector';
import { fetchFavoriteMovies } from '../../../redux/movie/movie.async';

function MyListPage(): JSX.Element {
  const dispatch = useTypedDispatch();

  const userAuthStatus = useTypedSelector(getAuthorizationStatus);
  const favoriteMovies = useTypedSelector(favoriteMoviesSelector);

  React.useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, [dispatch]);

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
