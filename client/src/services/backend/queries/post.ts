import {AxiosRequestConfig} from 'axios';

import {BlogPostDetailedModel} from '../../models';
import axiosConfig from '../index';
import {checkIsResponseDataExists} from '../utils';

export const getBlogPostData = async (blogPostId: string): Promise<BlogPostDetailedModel> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      url: `/api/blog/${blogPostId}`,
    };

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
