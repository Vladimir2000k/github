import {
  constructNonFieldErrors,
  normalizeCommonException,
  normalizeApiErrors,
} from './errorMessagesReplacer';

export function handleSagaError(error): Record<string, string[]> {
  const errorsObject = {
    nonFieldErrors: [],
  };

  // If error is not from an API
  if (error.response === undefined) {
    return Object.assign(errorsObject, {
      nonFieldErrors: [normalizeCommonException(error.message)],
    });
  }
  switch (error.response.status) {
    case 400:
      Object.assign(errorsObject, normalizeApiErrors(error.response.data));
      break;
    case 401:
      Object.assign(errorsObject, constructNonFieldErrors({nonFieldErrors: ['err401']})); // TODO add auto logout
      break;
    case 404:
      Object.assign(errorsObject, constructNonFieldErrors({nonFieldErrors: ['err404']}));
      break;
    case 500:
      Object.assign(errorsObject, constructNonFieldErrors({nonFieldErrors: ['err500']}));
      break;
    case 502:
      Object.assign(errorsObject, constructNonFieldErrors({nonFieldErrors: ['err502']}));
      break;
    default:
      Object.assign(errorsObject, constructNonFieldErrors(error.response.data));
      break;
  }
  return errorsObject;
}
