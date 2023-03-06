export enum CONTACT_US_EVENTS {
  ERROR = 'ERROR',
}

export interface ContactUsFormFieldsData {
  name: string;
  email: string;
  message: string;
}

export interface ContactUsGeneralPageErrorsData {
  nonFieldErrors?: string[];
  name?: string[];
  email?: string[];
  message?: string[];
}

export enum CONTACT_US_PAGE_ERRORS_SECTIONS {
  GENERAL = 'general',
}

export interface ContactUsPageErrorsData {
  [CONTACT_US_PAGE_ERRORS_SECTIONS.GENERAL]: ContactUsGeneralPageErrorsData;
}
