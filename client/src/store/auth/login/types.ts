export enum LOGIN_EVENTS {
  ERROR = 'ERROR',
  NAVIGATE_TO_RESEND_EMAIL = 'NAVIGATE_TO_RESEND_EMAIL',
  NAVIGATE_TO_WORKSPACES = 'NAVIGATE_TO_WORKSPACES',
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  nonFieldErrors: string[];
  email: string[];
  password: string[];
}

export interface LogoutErrors {
  nonFieldErrors: string[];
}

export enum LOGIN_PAGE_ERRORS_SECTIONS {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export interface LoginPageErrorsData {
  [LOGIN_PAGE_ERRORS_SECTIONS.LOGIN]: LoginErrors;
  [LOGIN_PAGE_ERRORS_SECTIONS.LOGOUT]: LogoutErrors;
}
