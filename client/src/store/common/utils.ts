import {handleSagaError} from '../../utils/sagaErrorsProcessor';
import {APP_GLOBAL_EVENTS} from '../appGlobal/types';

import {AppGlobalActions, AppGlobalModalsActions} from './reducerActions';

function handleUnauthorisedError(error) {
  if (error?.response?.status === 401) {
    return AppGlobalActions.postEvent({type: APP_GLOBAL_EVENTS.RELOGIN_REQUIRED});
  }
}

export function handleSagaErrorStateBased(error, errorActionReducer, errorsSectionName: string) {
  const possibleAction = handleUnauthorisedError(error);
  if (possibleAction !== undefined) return possibleAction;

  const errorsObject = handleSagaError(error);
  return errorActionReducer({[errorsSectionName]: errorsObject});
}

export function handleSagaErrorGlobalAlertBased(error: any) {
  const possibleAction = handleUnauthorisedError(error);
  if (possibleAction !== undefined) return possibleAction;

  const errorsObject = handleSagaError(error);

  return AppGlobalModalsActions.showErrorModal({
    localizedMessage: errorsObject.nonFieldErrors.join('\n'),
  });
}

export function handleSagaErrorEventBased(error, errorActionReducer, eventType) {
  const possibleAction = handleUnauthorisedError(error);
  if (possibleAction !== undefined) return possibleAction;

  const errorsObject = handleSagaError(error);
  return errorActionReducer({
    type: eventType,
    payload: errorsObject.nonFieldErrors,
  });
}
