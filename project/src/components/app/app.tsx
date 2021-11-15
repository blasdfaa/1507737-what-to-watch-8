import { Router, Route, Switch } from 'react-router-dom';

import { AppRoutes, AuthorizationStatus, ERROR_404_MESSAGE } from '../../const';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../services/browser-history';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import ErrorPage from '../../pages/error-page/error-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MoviePage from '../../pages/movie-page/movie-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import PlayerPage from '../../pages/player-page/player-page';

import SvgSprite from '../svg-sprite/svg-sprite';

function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <SvgSprite />
      <Switch>
        <Route path={AppRoutes.Login} exact>
          <LoginPage />
        </Route>

        <Route path={AppRoutes.Home} exact>
          <MainPage />
        </Route>

        <Route path={AppRoutes.MoviePage} exact>
          <MoviePage />
        </Route>

        <Route path={AppRoutes.MoviePlayer} exact>
          <PlayerPage />
        </Route>

        <PrivateRoute path={AppRoutes.FavoriteList} authorizationStatus={AuthorizationStatus.Auth} exact>
          <MyListPage />
        </PrivateRoute>

        <PrivateRoute
          path={AppRoutes.AddMovieReviewPage}
          authorizationStatus={AuthorizationStatus.Auth}
          exact
        >
          <AddReviewPage />
        </PrivateRoute>

        <Route exact>
          <ErrorPage code="404" text={ERROR_404_MESSAGE} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
