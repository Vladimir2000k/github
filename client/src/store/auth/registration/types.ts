export enum REGISTRATION_EVENTS {
  ERROR = 'ERROR',
  MAIL_RESENT = 'MAIL_RESENT',
  NAVIGATE_TO_ENTER_EMAIL = 'NAVIGATE_TO_ENTER_EMAIL',
  NAVIGATE_TO_RESEND_EMAIL = 'NAVIGATE_TO_RESEND_EMAIL',
  NAVIGATE_TO_HOME = 'NAVIGATE_TO_HOME',
}

export interface RegistrationFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegistrationErrors {
  nonFieldErrors: string[];
  email: string[];
  password1: string[];
  password2: string[];
}

export interface EnterEmailErrors {
  nonFieldErrors: string[];
  email: string[];
}

export enum REGISTRATION_PAGE_ERRORS_SECTIONS {
  REGISTRATION = 'registration',
  RESEND_EMAIL = 'resendEmail',
  CONFIRM_EMAIL = 'confirmEmail',
  ENTER_EMAIL = 'enterEmail',
}

export interface RegistrationPageErrorsData {
  [REGISTRATION_PAGE_ERRORS_SECTIONS.REGISTRATION]: RegistrationErrors;
  [REGISTRATION_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]: EnterEmailErrors;
}
