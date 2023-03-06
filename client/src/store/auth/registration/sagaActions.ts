import {createAction} from '@reduxjs/toolkit';

import {RegistrationFormData} from './types';

const SAGA_NAME_PREFIX = 'saga/registration/';

export const register = createAction<RegistrationFormData>(SAGA_NAME_PREFIX + 'register');

export const resendEmail = createAction(SAGA_NAME_PREFIX + 'resendEmail');

export const resendEmailConfirmation = createAction(SAGA_NAME_PREFIX + 'resendEmailConfirmation');

export const confirmEmail = createAction<string>(SAGA_NAME_PREFIX + 'confirmEmail');
