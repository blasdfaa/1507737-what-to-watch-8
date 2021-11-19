import { AuthorizationStatus } from '../../const';
import { UserInfo } from '../../types/user';
import { RootState } from '../store';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus =>
  state.USER_PROCESS.authorizationStatus;

export const getUserInfo = (state: RootState): UserInfo | null => state.USER_PROCESS.userInfo;
