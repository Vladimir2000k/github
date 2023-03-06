import {createAction} from '@reduxjs/toolkit';

const SAGA_PREFIX_NAME = 'saga/workspaces/';

export const initProjectsPage = createAction<{workspaceId: number}>(
  SAGA_PREFIX_NAME + 'initProjectsPage',
);

export const getProject = createAction<{projectId: string; workspaceId: string}>(
  SAGA_PREFIX_NAME + 'getProject',
);

export const createProject = createAction<{workspaceId: number}>(
  SAGA_PREFIX_NAME + 'createProject',
);
