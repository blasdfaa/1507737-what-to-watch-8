import React from 'react';

import { ApiDataStatus } from '../../const';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { getFavoriteMoviesFetchStatus } from '../../redux/favorite-movies/favorite-movies.selector';
import { fetchFavoriteMovies } from '../../redux/favorite-movies/favorite-movies.slice';

function MyListPage(): JSX.Element {
  const dispatch = useTypedDispatch();

  const favoirteMoviesLoadingStatus = useTypedSelector(getFavoriteMoviesFetchStatus);
  // const favoriteMovies = useAppSelector(getFavoriteMovies);

  React.useEffect(() => {
    if (favoirteMoviesLoadingStatus === ApiDataStatus.Idle) {
      dispatch(fetchFavoriteMovies());
    }
  }, [favoirteMoviesLoadingStatus]);

  return <div></div>;
}

export default MyListPage;
