import {RootState} from '../store';

import {ContactUsFormFieldsData, ContactUsPageErrorsData} from './types';

export const selectContactUsFormFieldsData = (state: RootState): ContactUsFormFieldsData =>
  state.contactUs.contactUsFields;

export const selectContactUsPageErrorsData = (state: RootState): ContactUsPageErrorsData =>
  state.contactUs.errors;
