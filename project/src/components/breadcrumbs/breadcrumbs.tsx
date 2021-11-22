import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  movieName: string;
  movieLink: string;
};

function Breadcrumbs({ movieName, movieLink }: BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={movieLink}>
            {movieName}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link">Add review</span>
        </li>
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
