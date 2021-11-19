/* eslint-disable no-console */
import React from 'react';
import { Redirect } from 'react-router';

import AppHeader from '../../components/app-header/app-header';
import { AppRoutes, AuthorizationStatus } from '../../const';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { getAuthorizationStatus } from '../../redux/user-process/user-process.selector';
import { requireLogin } from '../../redux/user-process/user-process.slice';

const EMAIL_VALID_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_VALID_REGEX = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;

const isEmailValid = (email: string): boolean => EMAIL_VALID_REGEX.test(email.toLowerCase());
const isPasswordValid = (password: string): boolean => PASSWORD_VALID_REGEX.test(password.toLowerCase());

function LoginPage(): JSX.Element | null {
  const dispatch = useTypedDispatch();

  const userAuthStatus = useTypedSelector(getAuthorizationStatus);

  const [isEmailError, setEmailError] = React.useState<boolean>(false);
  const [isPasswordError, setPasswordError] = React.useState<boolean>(false);

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current;
      const password = passwordRef.current;

      setEmailError(!isEmailValid(email.value));
      setPasswordError(!isPasswordValid(password.value));

      if (isEmailValid(email.value) && isPasswordValid(password.value)) {
        dispatch(requireLogin({ email: email.value, password: password.value }));
      }
    }
  };

  if (userAuthStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    <>
      {userAuthStatus === AuthorizationStatus.Auth && <Redirect to={AppRoutes.Home} />}
      <div className="user-page">
        <AppHeader className="user-page__head">
          <h1 className="page-title user-page__title">Sign in</h1>
        </AppHeader>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={handleSubmitForm}>
            <div className="sign-in__message">
              {isEmailError && <p>Please enter a valid email address</p>}
              {isPasswordError && <p>Please enter a valid password</p>}
            </div>
            <div className="sign-in__fields">
              <div className={`sign-in__field ${isEmailError ? 'sign-in__field--error' : ''}`}>
                <input
                  ref={emailRef}
                  className="sign-in__input"
                  type="text"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">
                  Email address
                </label>
              </div>
              <div className={`sign-in__field ${isPasswordError ? 'sign-in__field--error' : ''}`}>
                <input
                  ref={passwordRef}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">
                  Password
                </label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LoginPage;
