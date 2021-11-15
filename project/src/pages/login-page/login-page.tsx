/* eslint-disable no-console */
import React from 'react';

import AppHeader from '../../components/app-header/app-header';
import LoginAlert from '../../components/login-alert/login-alert';

// type FormErrorsState = {
//   email: string;
//   password: string;
// };

function LoginPage(): JSX.Element {
  // const [formErrors, setFormErrors] = React.useState<FormErrorsState>({ email: '', password: '' });
  // const [isFormValid, setFormValid] = React.useState<boolean>(false);
  const [isEmailValid, setEmailValid] = React.useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = React.useState<boolean>(false);
  const [emailValue, setEmailValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    switch (passwordValue) {
      case '123':
        setPasswordValid(false);
        break;

      default:
        setPasswordValid(true);
        break;
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const email = e.currentTarget.value;

    if (email === '123') {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }

    setEmailValue(email);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.currentTarget.value);
  };

  return (
    <div className="user-page">
      <AppHeader className="user-page__head">
        <h1 className="page-title user-page__title">Sign in</h1>
      </AppHeader>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmitForm}>
          {!isEmailValid && <LoginAlert>Email</LoginAlert>}
          {!isPasswordValid && <LoginAlert>Password</LoginAlert>}

          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={emailValue}
                onChange={handleChangeEmail}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={passwordValue}
                onChange={handleChangePassword}
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
  );
}

export default LoginPage;
