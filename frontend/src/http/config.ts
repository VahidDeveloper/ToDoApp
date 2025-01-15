import {AxiosRequestConfig, Method, ResponseType} from 'axios';

const isAbsoluteUrl = (url: string) => url.includes('http');

export const apiConfig = <T>(
  method: Method,
  url: string,
  baseURL = '',
  data: T = {} as T,
  config?: {
    responseType?: ResponseType;
  }
): AxiosRequestConfig<T> => ({
  method,
  url,
  data,
  baseURL: isAbsoluteUrl(url) ? baseURL : `${window.location.origin}/${baseURL}`,
  ...config,
});
