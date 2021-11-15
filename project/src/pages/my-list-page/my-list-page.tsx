import React from 'react';

import { ApiDataStatus } from '../../const';
import useAppDispatch from '../../hooks/use-app-dispatch';
import useAppSelector from '../../hooks/use-app-selector';
import { getFavoriteMoviesFetchStatus } from '../../redux/favorite-movies/favorite-movies.selector';
import { fetchFavoriteMovies } from '../../redux/favorite-movies/favorite-movies.slice';

function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const favoirteMoviesLoadingStatus = useAppSelector(getFavoriteMoviesFetchStatus);
  // const favoriteMovies = useAppSelector(getFavoriteMovies);

  React.useEffect(() => {
    if (favoirteMoviesLoadingStatus === ApiDataStatus.Idle) {
      dispatch(fetchFavoriteMovies());
    }
  }, [favoirteMoviesLoadingStatus]);

  return <div></div>;
}

export default MyListPage;
