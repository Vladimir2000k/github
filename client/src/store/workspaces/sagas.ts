import {call, put} from 'typed-redux-saga';

import {getWorkspaces} from '../../services/backend/queries/workspaces';
import {WorkspacesActions} from '../common/reducerActions';
import {handleSagaErrorEventBased} from '../common/utils';

import {WORKSPACES_EVENTS} from './types';

export function* initWorkspacesPage() {
  try {
    const workspaces = yield call(getWorkspaces);
    yield put(WorkspacesActions.updateWorkspacesData(workspaces));
    yield put(WorkspacesActions.postEvent({type: WORKSPACES_EVENTS.PAGE_INIT_PROCESSED}));
  } catch (error) {
    yield put(
      handleSagaErrorEventBased(error, WorkspacesActions.postEvent, WORKSPACES_EVENTS.ERROR),
    );
  }
}
