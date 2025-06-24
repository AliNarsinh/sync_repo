import Axios, { AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import { LRUCache } from 'lru-cache';
import { baseUrl, DISABLE_ERROR_NOTIFICATION_FOR_URLS } from '@app/constants';
import { first, isEqual } from 'lodash';
import { store } from '@app/store';
import { AuthActionsType, IAuthState } from '@app/store/type';
import { showToast, ToastType } from '@app/utils/toastUtils';

const JSON_HEADER = 'application/json';

const REQ_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const apiCache = new (LRUCache as any)({ max: 500, ttl: 1000 * 60 * 5 });

const checkNotificationBlackList = (url: string) => {
  let showNotification = true;
  // eslint-disable-next-line
  DISABLE_ERROR_NOTIFICATION_FOR_URLS.map((eachBlacklistUrl: string) => {
    if (showNotification && url.includes(eachBlacklistUrl)) {
      showNotification = false;
    }
  });
  return showNotification;
};

const instance = Axios.create({
  baseURL: baseUrl,
  timeout: REQ_TIMEOUT,
});

instance.defaults.headers.common.Accept = JSON_HEADER;
instance.defaults.headers.common['Content-Type'] = JSON_HEADER;

instance.interceptors.request.use(
  async (config) => {
    const accessToken = (store?.getState()?.auth as IAuthState)?.token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      apiCache.clear();
    }

    config.headers['req-scope'] = 'MOBILEMED-FE';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response: AxiosResponse<Record<string, any>>) => {
    // const { data } = response;
    // if (data?.message && data?.message?.length) {
    //   registerToastMessage(data?.message, true);
    // }
    return response;
  },
  async (error) => {
    const requestUrl = error?.response?.config?.url;

    if (error instanceof Axios.Cancel && !error.message) {
      error.message = 'Request cancelled';
    }

    const errorStatusCode = error?.response?.status;
    if (errorStatusCode === 401) {
      apiCache.clear();
      store.dispatch({
        type: AuthActionsType.LOGOUT,
      });
    }

    const errorResponseMessage = error?.response?.data?.message || error?.response?.data?.errorMessage;
    const shouldSilentError = error?.response?.data?.meta?.silent;
    const errorMessage =
      typeof errorResponseMessage === 'string'
        ? errorResponseMessage
        : (first(Object.values(errorResponseMessage || {})) as string);

    const isUserLackPermissionForRequestedResource =
      isEqual(errorMessage, `You don't have permission for this resource`) ||
      isEqual(errorMessage, `You do not have access to this resource`);
    // Ignore showing notification for permission related msg
    if (isUserLackPermissionForRequestedResource) {
      return Promise.reject(error);
    }

    if (errorMessage && !shouldSilentError && checkNotificationBlackList(requestUrl)) {
      // const requestId = error?.response?.headers?.['x-request-id'];
      //   registerToastMessage(errorMessage, false); // show toast here.
      showToast(ToastType.Error, errorMessage);
    }
    return Promise.reject(error);
  },
);

configure({ axios: instance, cache: apiCache });

export default instance;
