// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {CONTACT_US_EVENTS, ContactUsFormFieldsData, ContactUsPageErrorsData} from './types';

export interface ContactUsState extends EventHandlingState<CONTACT_US_EVENTS> {
  contactUsFields: ContactUsFormFieldsData;
  errors?: ContactUsPageErrorsData;
}

export const contactUsInitialState: ContactUsState = {
  events: eventsInitialState,
  contactUsFields: {
    name: '',
    email: '',
    message: '',
  },
  errors: {
    general: {
      nonFieldErrors: [],
      name: [],
      email: [],
      message: [],
    },
  },
};

export const CONTACT_US_REDUCER_NAME = 'contactUs';

const contactUsSlice = createSlice({
  name: CONTACT_US_REDUCER_NAME,
  initialState: contactUsInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.contactUsFields = {
        name: '',
        email: '',
        message: '',
      };
    },
    clearErrorsData: (state) => {
      state.errors = contactUsInitialState.errors;
    },
    updateFormFieldsData: (state, action: PayloadAction<Partial<ContactUsFormFieldsData>>) => {
      state.contactUsFields = Object.assign(state.contactUsFields, action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<ContactUsPageErrorsData>>) => {
      state.errors = Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<CONTACT_US_EVENTS>(),
  },
});

export default contactUsSlice;
