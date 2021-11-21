import React from 'react';

import { genresNames } from '../../const';

import type { MovieGenre } from '../../types/movie';

type GenresBarProps = {
  selectedGenre: MovieGenre;
  onGenreClick: (e: React.SyntheticEvent<HTMLAnchorElement>, genre: MovieGenre) => void;
};

function GenresBar({ selectedGenre, onGenreClick }: GenresBarProps): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genresNames.map((genre) => (
        <li
          className={`catalog__genres-item ${selectedGenre === genre ? 'catalog__genres-item--active' : ''}`}
          key={`${genre}_tab`}
        >
          <a href="_blank" className="catalog__genres-link" onClick={(e) => onGenreClick(e, genre)}>
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenresBar;
