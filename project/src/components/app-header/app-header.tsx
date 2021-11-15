import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type AppHeaderProps = {
  className?: string;
  children: ReactNode;
};

function AppHeader(props: AppHeaderProps): JSX.Element {
  const { children, className } = props;

  return (
    <header className={`page-header ${className}`}>
      <div className="logo">
        <Link className="logo__link" to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
    </header>
  );
}

export default AppHeader;
