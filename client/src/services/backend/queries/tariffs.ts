import {AxiosRequestConfig} from 'axios';

import {TariffModel} from '../../models';
import axiosConfig from '../index';
import {checkIsResponseDataExists} from '../utils';

export const getTariffs = async (): Promise<Array<TariffModel>> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: '/api/plans/',
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
