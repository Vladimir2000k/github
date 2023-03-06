import {AxiosRequestConfig, AxiosResponse} from 'axios';

import {getUndefinedVarErrMessage} from '../../../utils/checkUndefined';
import {OwnerModel, ProjectModel} from '../../models';
import axiosConfig from '../index';
import {checkIsResponseDataExists, withUserIdToken} from '../utils';

interface CreateWorkspaceQueryArgs {
  pk: number;
  name: string;
  owner: OwnerModel;
  creationDate: string;
  projects: Array<ProjectModel>;
}

export const createWorkspace = async (name: string): Promise<CreateWorkspaceQueryArgs> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'post',
      url: '/api/personal-area/workspaces',
      data: {
        name,
      },
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

interface updateWorkspaceAttrs {
  id: number;
  workspaceName: string;
}

export const updateWorkspace = async ({
  id,
  workspaceName,
}: updateWorkspaceAttrs): Promise<AxiosResponse> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'put',
      url: `/api/personal-area/workspaces/${id}`,
      data: {
        name: workspaceName,
      },
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteWorkspace = async (id: number): Promise<AxiosResponse> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'delete',
      url: `/api/personal-area/workspaces/${id}`,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getWorkspaces = async (): Promise<AxiosResponse> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'get',
      url: '/api/personal-area/workspaces',
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

interface GetWorkspaceQueryAttrs {
  pk: number;
  name: string;
  owner: OwnerModel;
  creationDate: string;
  projects: Array<ProjectModel>;
}

export const getWorkspace = async (id: number): Promise<GetWorkspaceQueryAttrs> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'get',
      url: `/api/personal-area/workspaces/${id}`,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
