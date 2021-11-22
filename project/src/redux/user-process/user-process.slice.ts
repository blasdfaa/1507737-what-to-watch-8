import { createSlice } from '@reduxjs/toolkit';

import { ApiDataStatus, AuthorizationStatus } from '../../const';
import { checkAuthStatus, requireLogin, requireLogout } from './user-process.async';

import type { UserInfo } from '../../types/user';

type userProcessSliceState = {
  authLoadingStatus: ApiDataStatus;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  errorMessage: string | undefined;
};

const initialState: userProcessSliceState = {
  authLoadingStatus: ApiDataStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  errorMessage: undefined,
};

export const userProcessSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        const userData = action.payload;

        state.userInfo = userData;
        state.authLoadingStatus = ApiDataStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.errorMessage = undefined;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.errorMessage = errorMessage;
        state.userInfo = null;
        state.authLoadingStatus = ApiDataStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(requireLogin.pending, (state) => {
        state.userInfo = null;
        state.authLoadingStatus = ApiDataStatus.Loading;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.errorMessage = undefined;
      })
      .addCase(requireLogin.fulfilled, (state, action) => {
        const userData = action.payload;

        state.userInfo = userData;
        state.authLoadingStatus = ApiDataStatus.Idle;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.errorMessage = undefined;
      })
      .addCase(requireLogin.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.userInfo = null;
        state.authLoadingStatus = ApiDataStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.errorMessage = errorMessage;
      })
      .addCase(requireLogout.pending, (state) => {
        state.authLoadingStatus = ApiDataStatus.Loading;
      })
      .addCase(requireLogout.fulfilled, (state) => {
        state.userInfo = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(requireLogout.rejected, (state, action) => {
        const errorMessage = action.payload;

        state.authLoadingStatus = ApiDataStatus.Failed;
        state.errorMessage = errorMessage;
      }),
});

export default userProcessSlice.reducer;
