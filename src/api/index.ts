 import axios, {AxiosRequestConfig} from 'axios';
 import configEnv from 'react-native-config';
 import { Response } from '../type';

const intance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

interface Intance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<Response<T>>;
  post<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>>;
  put<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<Response<T>>;
}


export const API_CORE: Intance = {
  get: function (url, config = {}) {
    return intance.get(url, {
      ...config,
      baseURL: configEnv.CORE_BASE_URL,
    });
  },
  post: function (url, body, config = {}) {
    return intance.post(url, body, {
      ...config,
      baseURL: configEnv.CORE_BASE_URL,
    });
  },
  delete: function (url, config = {}) {
    return intance.delete(url, {
      ...config,
      baseURL: configEnv.CORE_BASE_URL,
    });
  },
  put: function (url, body, config = {}) {
    return intance.put(url, body, {
      ...config,
      baseURL: configEnv.CORE_BASE_URL,
    });
  },
};
