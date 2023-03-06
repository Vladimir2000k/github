import {ContactUsGeneralPageErrorsData} from '../contactUs/types';

export enum API_INTEGRATION_REQUEST_EVENTS {
  ERROR = 'ERROR',
}

export interface APIIntegrationRequestFormFieldsData {
  name: string;
  email: string;
  message: string;
}

export interface APIIntegrationRequestPageErrorsData {
  nonFieldErrors: string[];
  name: string[];
  email: string[];
  message: string[];
}

export enum API_INTEGRATION_REQUEST_PAGE_ERRORS_SECTIONS {
  GENERAL = 'general',
}

export interface ApiIntegrationRequestPageErrorsData {
  [API_INTEGRATION_REQUEST_PAGE_ERRORS_SECTIONS.GENERAL]: APIIntegrationRequestPageErrorsData;
}
