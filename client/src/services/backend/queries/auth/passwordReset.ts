import {AxiosRequestConfig} from 'axios';

import axiosConfig from '../../index';
import {checkIsResponseDataExists} from '../../utils';

export const sendPasswordResetEmailLink = async (email: string) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/password/reset/',
      data: {
        email,
      },
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

interface ConfirmPasswordResetRequestData {
  uid: string;
  token: string;
  password1: string;
  password2: string;
}

export const confirmPasswordReset = async (
  confirmPasswordResetData: ConfirmPasswordResetRequestData,
) => {
  try {
    const {
      uid,
      token,
      password1: new_password1,
      password2: new_password2,
    } = confirmPasswordResetData;

    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/password/reset/confirm/',
      data: {
        uid,
        token,
        new_password1,
        new_password2,
      },
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
