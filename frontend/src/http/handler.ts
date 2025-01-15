import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';



const regularHttpErrorHandler = (error: AxiosError) => {
    if (!error.response) return '';
    const res = error.response as AxiosResponse;
    return res.data ? res.data.error_description || res.data.message || res.statusText : '';
};

// Error Handlers
const defaultErrorMessage = (lang = 'en-us') => 'data.errorPages';
const otherErrorHandler = (error: AxiosError, lang = 'en-us') => {
    const isNetworkError = (msg: string) => (error.message ? error.message : msg);
    return isNetworkError(defaultErrorMessage(lang));
};

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

// Axios onResponseRejected
export const onResponseRejected = async (error: AxiosError) => {
    const err_res = error.response;
    const message = err_res ? regularHttpErrorHandler(error) : otherErrorHandler(error);
    // showErrorToast(message || defaultErrorMessage());
    return error;
};
