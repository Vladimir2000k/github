import {TARIFFS} from '../../constants/values';

export enum PROFILE_EVENTS {
  ERROR = 'ERROR',
  NAVIGATE_TO_LANDING = 'NAVIGATE_TO_LANDING',
}

export interface ProfilePageUserData {
  firstName: string;
  lastName: string;
  email: string;
  plan: TARIFFS;
}

export interface ProfilePageUserFormFieldsData {
  firstName: string;
  lastName: string;
}

export interface ProfilePagePasswordChangeFormFieldsData {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface ProfilePageUserFormErrors {
  nonFieldErrors: string[];
  firstName: string[];
  lastName: string[];
}

export interface ProfilePagePasswordChangeFormErrors {
  nonFieldErrors: string[];
  oldPassword: string[];
  newPassword1: string[];
  newPassword2: string[];
}

export enum PROFILE_PAGE_ERRORS_SECTIONS {
  USER_FORM = 'userFormFields',
  PASSWORD_CHANGE_FORM = 'passwordChangeFormFields',
}

export interface ProfilePageErrorsData {
  [PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM]: ProfilePageUserFormErrors;
  [PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM]: ProfilePagePasswordChangeFormErrors;
}
