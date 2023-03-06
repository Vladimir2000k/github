export enum WORKSPACES_EVENTS {
  PAGE_INIT_PROCESSED = 'PAGE_INIT_PROCESSED',
  ERROR = 'ERROR',
}

export interface WorkspacesPageErrorsData {
  nonFieldErrors?: string[];
}
