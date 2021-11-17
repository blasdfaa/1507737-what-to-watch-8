import React from 'react';

import MoviesCard from '../movies-card/movies-card';

import type { Movie } from '../../types/movie';

type MoviesListProps = {
  movies: Movie[];
};

function MoviesList(props: MoviesListProps): JSX.Element {
  const { movies } = props;

  return (
    <div className="catalog__films-list">
      {movies &&
        movies.map(({ id, title, previewImage, previewVideoLink }) => (
          <React.Fragment key={id}>
            <MoviesCard
              id={id}
              title={title}
              previewImage={previewImage}
              previewVideoLink={previewVideoLink}
            />
          </React.Fragment>
        ))}
    </div>
  );
}

export default MoviesList;
