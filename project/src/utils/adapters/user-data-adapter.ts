import { ApiUserInfo } from '../../types/api';
import { UserInfo } from '../../types/user';

export const adaptUserDataToClient = (userInfo: ApiUserInfo): UserInfo => ({
  id: userInfo.id,
  email: userInfo.email,
  name: userInfo.name,
  avatarUrl: userInfo['avatar_url'],
  token: userInfo.token,
});
