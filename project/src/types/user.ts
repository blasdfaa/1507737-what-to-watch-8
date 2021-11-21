import { TokenType } from '../services/auth-token';

export type AuthUserData = {
  email: string;
  password: string;
};

export type UserInfo = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: TokenType;
};
