import { Link } from 'react-router-dom';

import AppHeader from '../../app-header/app-header';

import './error-page.css';

type ErrorPageProps = {
  code: string;
  text: string;
};

function ErrorPage(props: ErrorPageProps): JSX.Element {
  const { code, text } = props;

  return (
    <div className="error-page">
      <AppHeader className="error-page__head">
        <h1 className="visually-hidden">Error page</h1>
      </AppHeader>
      <div className="error-page__content">
        <p className="error-page__message">ERROR {code}</p>
        <p className="error-page__message">{text}</p>
        <Link className="error-page__link" to="/">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
