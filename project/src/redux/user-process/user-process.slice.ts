import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../api';
import { ActionType, ApiDataStatus, ApiEndpoint, AppRoutes, AuthorizationStatus } from '../../const';
import { adaptUserDataToClient } from '../../utils/adapters/user-data-adapter';
import { removeAuthTokenFromStorage, setAuthTokenToStorage } from '../../services/auth-token';
import { redirectToRouteAction } from './user-process.action';

import type { ApiUserInfo } from '../../types/api';
import type { AuthUserData, UserInfo } from '../../types/user';

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

export const checkAuthStatus = createAsyncThunk<UserInfo, void, { rejectValue: string }>(
  ActionType.CheckAuthStatus,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiUserInfo>(ApiEndpoint.Login);
      const adaptedData = adaptUserDataToClient(data);

      return adaptedData;
    } catch (error) {
      // TODO: Вернуть ошибку из axios'a
      return rejectWithValue('error');
    }
  },
);

export const requireLogin = createAsyncThunk<UserInfo, AuthUserData, { rejectValue: string }>(
  ActionType.RequireLogin,
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post<ApiUserInfo>(ApiEndpoint.Login, userData);
      const adaptedData = adaptUserDataToClient(data);

      setAuthTokenToStorage(data.token);
      await dispatch(redirectToRouteAction(AppRoutes.Home));

      return adaptedData;
    } catch (error) {
      // TODO: Вернуть ошибку из axios'a
      return rejectWithValue('error');
    }
  },
);

export const requireLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  ActionType.RequireLogout,
  async (_, { rejectWithValue }) => {
    try {
      await api.delete(ApiEndpoint.Logout);
      removeAuthTokenFromStorage();
    } catch (error) {
      // TODO: Вернуть ошибку из axios'a
      return rejectWithValue('error');
    }
  },
);

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
      .addCase(requireLogout.pending, (state) => {
        state.authLoadingStatus = ApiDataStatus.Loading;
      })
      .addCase(requireLogout.fulfilled, (state) => {
        state.userInfo = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      }),
});

export default userProcessSlice.reducer;
