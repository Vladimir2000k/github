import {AxiosRequestConfig} from 'axios';

import {BlogPostModel} from '../../models';
import axiosConfig from '../index';
import {checkIsResponseDataExists} from '../utils';

export const getBlogPosts = async (): Promise<Array<BlogPostModel>> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: '/api/blog/',
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
