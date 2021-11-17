import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../const';

import type { MovieCard } from '../../types/movie';

function MoviesCard({ id, title, previewImage, previewVideoLink }: MovieCard): JSX.Element {
  const [isHovered, setHovered] = React.useState<boolean>(false);

  const handleHoverAdd = (): void => {
    setHovered(true);
  };

  const handleHoverLeave = (): void => {
    setHovered(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleHoverAdd}
      onMouseLeave={handleHoverLeave}
    >
      <Link to={`${AppRoutes.Movies}/${id}`}>
        <div className="small-film-card__image">
          {isHovered && (
            <video preload="auto" width="280" height="175" muted loop autoPlay>
              <source src={previewVideoLink}></source>
            </video>
          )}
          {!isHovered && (
            <img
              src={previewImage}
              alt="Fantastic Beasts: The Crimes of Grindelwald"
              width="280"
              height="175"
            />
          )}
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoutes.Movies}/${id}`}>
          {title}
        </Link>
      </h3>
    </article>
  );
}

export default MoviesCard;
