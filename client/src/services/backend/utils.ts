import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {getUndefinedVarErrMessage} from '../../utils/checkUndefined';

export const checkIsResponseDataExists = (responseData: AxiosResponse): void => {
  if (responseData === null || responseData === undefined) {
    throw new Error('Network error! Try again later!');
  }
};

export const withUserIdToken = (axiosRequestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  const idToken = localStorage.getItem('authToken');
  if (!idToken) throw new Error(getUndefinedVarErrMessage({idToken}));
  return {
    ...axiosRequestConfig,
    headers: {
      ...axiosRequestConfig.headers,
      authorization: `Bearer ${idToken}`,
    },
  };
};
