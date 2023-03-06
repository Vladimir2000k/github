export enum WORKSPACE_MODIFY_EVENTS {
  ERROR = 'ERROR',
  NAVIGATE_TO_WORKSPACE_INTERIOR_PROJECTS = 'NAVIGATE_TO_WORKSPACE_INTERIOR_PROJECTS',
  NAVIGATE_TO_WORKSPACES = 'NAVIGATE_TO_WORKSPACES',
}

export interface WorkspaceModifyFormData {
  workspaceName: string;
}

export interface WorkspaceOwner {
  pk: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface WorkspaceModifyCreationErrors {
  nonFieldErrors: string[];
  name: string[];
}

export interface WorkspaceUpdatingCreationErrors {
  nonFieldErrors: string[];
  name: string[];
}

export enum WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS {
  CREATE = 'create',
  UPDATE = 'update',
}

export interface WorkspaceModifyPageErrorsData {
  [WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.CREATE]: WorkspaceModifyCreationErrors;
  [WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE]: WorkspaceUpdatingCreationErrors;
}
