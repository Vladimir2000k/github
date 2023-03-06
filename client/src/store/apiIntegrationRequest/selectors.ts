import {RootState} from '../store';

import {APIIntegrationRequestFormFieldsData, ApiIntegrationRequestPageErrorsData} from './types';

export const selectAPIIntegrationRequestFormFieldsData = (
  state: RootState,
): APIIntegrationRequestFormFieldsData => state.apiIntegrationRequest.formFields;

export const selectAPIIntegrationRequestPageErrorsData = (
  state: RootState,
): ApiIntegrationRequestPageErrorsData => state.apiIntegrationRequest.errors;
