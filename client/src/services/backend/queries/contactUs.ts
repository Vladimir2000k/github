import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {ContactUsFormFieldsData} from '../../../store/contactUs/types';
import axiosConfig from '../index';
import {checkIsResponseDataExists} from '../utils';

type FeedbackData = ContactUsFormFieldsData;

export const sendFeedback = async (feedback: FeedbackData): Promise<AxiosResponse> => {
  const {name, email, message} = feedback;

  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/api/feedbacks/',
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
