const AUTH_TOKEN_KEY_NAME = 'what-to-watch-auth-token';

export type TokenType = string;

export const getAuthToken = (): TokenType => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

export const setAuthToken = (token: TokenType): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
