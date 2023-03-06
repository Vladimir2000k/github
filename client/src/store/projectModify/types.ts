import {GENERATION_LANG_OPTIONS} from '../appGlobal/types';

export enum PROJECT_MODIFY_EVENTS {
  ERROR = 'ERROR',
  NAVIGATE_TO_GENERATION = 'NAVIGATE_TO_GENERATION',
  NAVIGATE_TO_WORKSPACE_ROOT = 'NAVIGATE_TO_WORKSPACE_ROOT',
}

export interface ProjectModifyGenerationLanguages {
  sourceLang: GENERATION_LANG_OPTIONS;
  targetLang: GENERATION_LANG_OPTIONS;
}

export interface ProjectModifyFormData {
  name: string;
  description: string;
}

export interface ProjectModifyCreationErrors {
  nonFieldErrors: string[];
  name: string[];
  description: string[];
}

export interface ProjectUpdatingCreationErrors {
  nonFieldErrors: string[];
  name: string[];
  description: string[];
}

export enum PROJECT_MODIFY_PAGE_ERRORS_SECTIONS {
  CREATE = 'create',
  UPDATE = 'update',
}

export interface ProjectModifyPageErrorsData {
  [PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.CREATE]: ProjectModifyCreationErrors;
  [PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE]: ProjectUpdatingCreationErrors;
}

export interface CreateProjectActionPayload {
  workspaceId: number;
}

export interface UpdateProjectActionPayload {
  workspaceId: number;
  projectId: number;
}

export interface DeleteProjectActionPayload {
  workspaceId: number;
  projectId: number;
}
