import {createAction} from '@reduxjs/toolkit';

import {
  CreateProjectActionPayload,
  DeleteProjectActionPayload,
  UpdateProjectActionPayload,
} from './types';

const SAGA_NAME_PREFIX = 'saga/projectModify/';

export const createProject = createAction<CreateProjectActionPayload>(
  SAGA_NAME_PREFIX + 'createProject',
);

export const updateProject = createAction<UpdateProjectActionPayload>(
  SAGA_NAME_PREFIX + 'updateProject',
);

export const deleteProject = createAction<DeleteProjectActionPayload>(
  SAGA_NAME_PREFIX + 'deleteProject',
);
