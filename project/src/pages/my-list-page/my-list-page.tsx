import React from 'react';

import { ApiDataStatus } from '../../const';
import useAppDispatch from '../../hooks/use-app-dispatch';
import useAppSelector from '../../hooks/use-app-selector';
import { getFavoriteMoviesLoadingStatus } from '../../redux/favorite-movies/favorite-movies.selector';
import { fetchFavoriteMovies } from '../../redux/favorite-movies/favorite-movies.slice';

function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const favoirteMoviesLoadingStatus = useAppSelector(getFavoriteMoviesLoadingStatus);
  // const favoriteMovies = useAppSelector(getFavoriteMovies);

  React.useEffect(() => {
    if (favoirteMoviesLoadingStatus === ApiDataStatus.Idle) {
      dispatch(fetchFavoriteMovies());
    }
  }, [favoirteMoviesLoadingStatus]);

  return <div></div>;
}

export default MyListPage;
