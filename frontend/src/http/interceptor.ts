import {AxiosError,  AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import * as handlers from './handler';
import { NextResponse } from 'next/server';

const onRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  return handlers.onRequestFulfilled(config) as InternalAxiosRequestConfig;
};
const onRequestRejected = (error: AxiosError) => Promise.reject(error);

const onResponseFulfilled = (response: AxiosResponse) => {
  return response;
};

// TODO CHANGE
const onResponseRejected = async (error: AxiosError) => {
  /*eslint-disable */
  const originalRequest = error.config;
  //@ts-ignore
  if ((error.response!.status === 401 || error.response!.status === 422) && originalRequest) {
    document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    NextResponse.redirect(new URL('/auth/signin', 'a'))
  }
  return Promise.reject(error);
};

export {onRequestFulfilled, onRequestRejected, onResponseFulfilled, onResponseRejected};
