import {  AxiosRequestConfig } from 'axios';
// Error Handlers
/**
 * it would set header config
 * it would remove Authorization from storage request , do not need Authorization header for minio
 * @param config
 */
// Axios onRequestFulfilled
export const onRequestFulfilled = (config: AxiosRequestConfig) => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
    config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
        'use_redirect': false,
    };
    return config;
};
