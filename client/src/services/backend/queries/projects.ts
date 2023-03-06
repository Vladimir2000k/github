import {AxiosRequestConfig} from 'axios';

import {
  ProjectModifyFormData,
  ProjectModifyGenerationLanguages,
} from '../../../store/projectModify/types';
import {BalanceModel, ProjectModel} from '../../models';
import axiosConfig from '../index';
import {checkIsResponseDataExists, withUserIdToken} from '../utils';

type ModifyProjectArgs = ProjectModifyFormData & ProjectModifyGenerationLanguages;

export const createProject = async (
  workspaceId: number,
  data: ModifyProjectArgs,
): Promise<ProjectModel> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'post',
      url: `/api/personal-area/workspaces/${workspaceId}/projects`,
      data,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (
  workspaceId: number,
  projectId: number,
  data: ModifyProjectArgs,
): Promise<ProjectModel> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'put',
      url: `/api/personal-area/workspaces/${workspaceId}/projects/${projectId}`,
      data,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (
  workspaceId: number,
  projectId: number,
): Promise<ProjectModel> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'delete',
      url: `/api/personal-area/workspaces/${workspaceId}/projects/${projectId}`,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async (workspaceId: number): Promise<Array<ProjectModel>> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'get',
      url: `/api/personal-area/workspaces/${workspaceId}/projects`,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

interface getProjectQueryArgs {
  projectId: string;
  workspaceId: string;
}

export const getProject = async ({
  projectId,
  workspaceId,
}: getProjectQueryArgs): Promise<ProjectModel> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'get',
      url: `/api/personal-area/workspaces/${workspaceId}/projects/${projectId}`,
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBalance = async (): Promise<BalanceModel> => {
  try {
    const requestConfig: AxiosRequestConfig = withUserIdToken({
      method: 'get',
      url: '/api/personal-area/balance',
    });

    const response = await axiosConfig(requestConfig);
    checkIsResponseDataExists(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
