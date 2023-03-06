import {AxiosRequestConfig} from 'axios';

import {RegistrationFormData} from '../../../../store/auth/registration/types';
import axiosConfig from '../../index';
import {checkIsResponseDataExists} from '../../utils';

type RegistrationRequestData = RegistrationFormData;

export const register = async (registrationFormData: RegistrationRequestData) => {
  const {email, password, passwordConfirmation} = registrationFormData;

  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/registration/',
      data: {
        email,
        password1: password,
        password2: passwordConfirmation,
      },
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendEmail = async (email: string) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/registration/resend-email/',
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

export const confirmEmail = async (key: string) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/account-confirm-email/',
      data: {
        key,
      },
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
