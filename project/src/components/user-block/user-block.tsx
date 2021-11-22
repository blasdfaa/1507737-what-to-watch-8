import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes, AuthorizationStatus } from '../../const';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { requireLogout } from '../../redux/user-process/user-process.async';
import { getAuthorizationStatus, getUserInfo } from '../../redux/user-process/user-process.selector';

function UserBlock(): JSX.Element | null {
  const dispatch = useTypedDispatch();

  const authStatus = useTypedSelector(getAuthorizationStatus);
  const userInfo = useTypedSelector(getUserInfo);

  const handleLogoutClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(requireLogout());
  };

  if (authStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    <ul className="user-block">
      {authStatus === AuthorizationStatus.Auth ? (
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to={AppRoutes.FavoriteList}>
                <img src={userInfo?.avatarUrl} alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" href="_blank" onClick={handleLogoutClick}>
              Sign out
            </a>
          </li>
        </>
      ) : (
        <Link to={AppRoutes.Login} className="user-block__link">
          Sign in
        </Link>
      )}
    </ul>
  );
}

export default UserBlock;
