import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserInfo } from '../../types/user';

type userProcessSliceState = {
  AuthorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
};

const initialState: userProcessSliceState = {
  AuthorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const userProcessSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});

export default userProcessSlice.reducer;
