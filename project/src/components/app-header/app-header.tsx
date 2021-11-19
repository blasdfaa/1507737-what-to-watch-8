import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../const';

type AppHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

function AppHeader({ children, className }: AppHeaderProps): JSX.Element {
  return (
    <header className={`page-header ${className}`}>
      <div className="logo">
        <Link className="logo__link" to={AppRoutes.Home}>
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
