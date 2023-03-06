import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LoginFormData} from '../../../../store/auth/login/types';
import axiosConfig from '../../index';
import {checkIsResponseDataExists, withUserIdToken} from '../../utils';

type LoginRequestData = LoginFormData;

export const login = async (loginFormData: LoginRequestData) => {
  const {email, password} = loginFormData;

  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/login/',
      data: {
        email,
        password,
      },
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    localStorage.setItem('authToken', response.data.key);
    window.dispatchEvent(new CustomEvent('customTokenChangedEvent'));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'post',
      url: '/api/auth/logout/',
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    localStorage.removeItem('authToken');
    window.dispatchEvent(new CustomEvent('customTokenChangedEvent'));

    return response.data;
  } catch (error) {
    throw error;
  }
};
