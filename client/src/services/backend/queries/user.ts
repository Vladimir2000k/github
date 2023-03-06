import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {TARIFFS} from '../../../constants/values';

import axiosConfig from '../index';
import {checkIsResponseDataExists, withUserIdToken} from '../utils';

export const getUserData = async () => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'get',
      url: '/api/auth/user/',
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    response.data = Object.assign(response.data, {
      plan: TARIFFS.INTRO,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

interface UpdatePasswordQueryArgs {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export const updatePassword = async ({
  oldPassword,
  newPassword1,
  newPassword2,
}: UpdatePasswordQueryArgs): Promise<AxiosResponse> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'post',
      url: '/api/auth/password/change/',
      data: {
        oldPassword: oldPassword,
        newPassword1: newPassword1,
        newPassword2: newPassword2,
      },
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
