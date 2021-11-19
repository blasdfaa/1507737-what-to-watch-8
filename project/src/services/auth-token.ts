const AUTH_TOKEN_KEY_NAME = 'what-to-watch-auth-token';

export type TokenType = string;

export const getAuthTokenFromStorage = (): TokenType => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

export const setAuthTokenToStorage = (token: TokenType): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const removeAuthTokenFromStorage = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
