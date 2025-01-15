import axios, {AxiosPromise, ResponseType} from 'axios';
import {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
} from './interceptor';
import {apiConfig} from './config';
import {apiConstants} from './const';

/*
 * Create & Config Axios Instance Using Interceptors
 */
const service = axios.create({});

service.interceptors.request.use(onRequestFulfilled, onRequestRejected);
service.interceptors.response.use(onResponseFulfilled, onResponseRejected);

const URL_PREFIX = apiConstants.apiPrefix;
/*
 * Get Services
 */
const getItem = <R>(
  url: string,
  urlPrefix = URL_PREFIX,
  config?: {
    responseType?: ResponseType;
  }
) => service(apiConfig('get', url, urlPrefix, undefined, config)) as AxiosPromise<R>;

const getItems = <R>(url: string, args?: any) => {
  if (args) {
    const {pagination, sort, search, trashed, querySearch} = args;
    return getItem<R>(
      paginationUrl(url, pagination, sort) +
        generateSearchParam(search, querySearch) +
        `${trashed ? `&trashed=${trashed}` : ''}`
    );
  } else return getItem<R>(url);
};

/*
 * Post Service
 */
const postItem = <T, R>(
  url: string,
  data: T = {} as T,
  args?: any,
  urlPrefix = URL_PREFIX,
  config?: {
    responseType?: ResponseType;
  }
) => {
  let URL = url;
  if (args) {
    URL = paginationUrl(url, args.pagination, args.sort);
  }
  return service(apiConfig<T>('post', URL, urlPrefix, data, config)) as AxiosPromise<R>;
};

/*
 * Delete Service
 */
const deleteItem = <T, R>(url: string, data: T = {} as T, urlPrefix = URL_PREFIX) =>
  service(apiConfig('delete', url, urlPrefix, data)) as AxiosPromise<R>;

/*
 * Put Service
 */
const putItem = <T, R>(
  url: string,
  data: T,
  config?: {
  }
) => service({...apiConfig('put', url, URL_PREFIX, data, config)}) as AxiosPromise<R>;

const paginationUrl = (url:string, pagination:any, sort:any) =>
  url +
  '?' +
  `${pagination ? `page=${pagination.page}&size=${pagination.size}` : ''}` +
  `${sort ? `&sort=${sort.key},${sort.mode}` : ''}`;

const generateSearchParam = (search = '', querySearch = '') => {
  if (search && querySearch) {
    return `${`&label=${search},${querySearch}`}`;
  }
  if (search) {
    return `${`&label=${search}`}`;
  }
  if (querySearch) {
    return querySearch;
  }
  return ``;
};

export {getItem, getItems, postItem, putItem, deleteItem};
export default service;
