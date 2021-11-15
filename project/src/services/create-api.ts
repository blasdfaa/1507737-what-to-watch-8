import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getAuthToken } from './auth-token';

const BACKEND_URL = 'https://8.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const axiosConfig = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  axiosConfig.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getAuthToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return axiosConfig;
};
