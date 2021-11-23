import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { ActionType, ApiEndpoint, AppRoutes, ErrorMessage } from '../../const';
import { removeAuthTokenFromStorage, setAuthTokenToStorage } from '../../services/auth-token';
import { adaptUserDataToClient } from '../../utils/adapters/user-data-adapter';
import api from '../api';
import { redirectToRouteAction } from './user-process.action';

import type { AuthUserData, UserInfo } from '../../types/user';
import type { ApiUserInfo } from '../../types/api';
import type { AxiosError } from 'axios';

export const checkAuthStatus = createAsyncThunk<UserInfo, void, { rejectValue: string }>(
  ActionType.CheckAuthStatus,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ApiUserInfo>(ApiEndpoint.Login);

      return adaptUserDataToClient(data);
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      return rejectWithValue(errorMessage);
    }
  },
);

export const requireLogin = createAsyncThunk<UserInfo, AuthUserData, { rejectValue: string }>(
  ActionType.RequireLogin,
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post<ApiUserInfo>(ApiEndpoint.Login, userData);
      const adaptedData = adaptUserDataToClient(data);
      const userName = adaptedData.name;

      setAuthTokenToStorage(data.token);
      toast.success(`You are logged in as - ${userName.toUpperCase()}`);
      await dispatch(redirectToRouteAction(AppRoutes.Home));

      return adaptedData;
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.Login);
      return rejectWithValue(errorMessage);
    }
  },
);

export const requireLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  ActionType.RequireLogout,
  async (_, { rejectWithValue }) => {
    try {
      await api.delete(ApiEndpoint.Logout);
      removeAuthTokenFromStorage();
    } catch (e) {
      const errorMessage = (e as AxiosError).message;

      toast.error(ErrorMessage.Logout);
      return rejectWithValue(errorMessage);
    }
  },
);
