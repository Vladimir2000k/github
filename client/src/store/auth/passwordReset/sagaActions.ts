import {createAction} from '@reduxjs/toolkit';

import {ConfirmPasswordResetActionPayload} from './actionPayloads';

const SAGA_PREFIX = 'saga/passwordReset/';

export const sendPasswordResetEmailLink = createAction(SAGA_PREFIX + 'sendPasswordResetEmailLink');

export const confirmPasswordReset = createAction<ConfirmPasswordResetActionPayload>(
  SAGA_PREFIX + 'confirmPasswordReset',
);

export const resendEmail = createAction(SAGA_PREFIX + 'resendEmail');

export const resendEmailConfirmation = createAction(SAGA_PREFIX + 'resendEmailConfirmation');
