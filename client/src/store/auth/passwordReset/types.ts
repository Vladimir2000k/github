export enum PASSWORD_RESET_EVENTS {
  ERROR = 'ERROR',
  MAIL_RESENT = 'MAIL_RESENT',
  NAVIGATE_TO_RESEND_EMAIL = 'NAVIGATE_TO_RESEND_EMAIL',
  NAVIGATE_TO_CONFIRM_PASSWORD_RESET = 'NAVIGATE_TO_CONFIRM_PASSWORD_RESET',
  NAVIGATE_TO_ENTER_EMAIL = 'NAVIGATE_TO_ENTER_EMAIL',
  NAVIGATE_TO_LOGIN = 'NAVIGATE_TO_LOGIN',
}

export interface PasswordResetFormData {
  email: string;
  password1: string;
  password2: string;
}

export enum PASSWORD_RESET_PAGE_ERRORS_SECTIONS {
  PASSWORD_RESET = 'passwordReset',
  CONFIRM_PASSWORD_RESET = 'confirmPasswordReset',
  ENTER_EMAIL = 'enterEmail',
  RESEND_EMAIL = 'resendEmail',
}

export interface PasswordResetErrors {
  nonFieldErrors: string[];
  email: string[];
}

export interface ConfirmPasswordResetErrors {
  nonFieldErrors: string[];
  password1: string[];
  password2: string[];
}

export interface EnterEmailForPasswordResetErrors {
  nonFieldErrors: string[];
  email: string[];
}

export interface PasswordResetPageErrorsData {
  [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET]: PasswordResetErrors;
  [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET]: ConfirmPasswordResetErrors;
  [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]: EnterEmailForPasswordResetErrors;
}
