import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {APIIntegrationRequestFormFieldsData} from '../../../store/apiIntegrationRequest/types';
import axiosConfig from '../index';
import {checkIsResponseDataExists} from '../utils';

type APIIntegrationRequestData = APIIntegrationRequestFormFieldsData;

export const sendAPIIntegrationRequest = async (
  apiIntegrationRequestData: APIIntegrationRequestData,
): Promise<AxiosResponse> => {
  const {name, email, message} = apiIntegrationRequestData;

  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/api-integration-requests/',
      data: {
        name,
        email,
        message,
      },
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
