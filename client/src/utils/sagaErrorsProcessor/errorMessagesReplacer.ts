import {t, exists} from 'i18next';

import {
  API_EXCEPTIONS_MAPPINGS,
  INTERNAL_EXCEPTIONS_MAPPINGS,
} from '../../constants/errorMessagesReplacements';

import {capitalize} from '../textProcessing';

type ApiErrorData = Record<string, string[]>;

export const replaceErrorString = (
  string = '',
  replacementsMap: Record<string, string>,
): string => {
  const translatedError = exists('errors.' + string) ? t('errors.' + string) : string;
  return replacementsMap[string] || capitalize(translatedError);
};

export const normalizeCommonException = (errorString: string): string => {
  return replaceErrorString(errorString, INTERNAL_EXCEPTIONS_MAPPINGS);
};

export const constructNonFieldErrors = (
  errorsData: Record<string, string | string[]>,
): ApiErrorData => {
  const errorsArray = [];
  Object.entries(errorsData).forEach(([key, errMessages]) => {
    const processMessage = (msg) => {
      const errorString = replaceErrorString(msg, API_EXCEPTIONS_MAPPINGS);
      if (['nonFieldErrors', 'detail'].includes(key)) {
        errorsArray.push(errorString);
      } else errorsArray.push(`${key}: ${errorString}`);
    };

    if (Array.isArray(errMessages)) {
      errMessages.forEach(processMessage);
    } else {
      processMessage(errMessages);
    }
  });
  return {
    nonFieldErrors: errorsArray,
  };
};

export const normalizeApiErrors = (errorsData: ApiErrorData): ApiErrorData => {
  const normalizedErrorsData: ApiErrorData = {};
  Object.entries(errorsData).forEach(([key, errMessages]) => {
    const outputKey = key in ['details'] ? 'nonFieldErrors' : key;
    normalizedErrorsData[outputKey] = errMessages.map((msg) =>
      replaceErrorString(msg, API_EXCEPTIONS_MAPPINGS),
    );
  });
  return normalizedErrorsData;
};
