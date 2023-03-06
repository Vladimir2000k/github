// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put} from 'typed-redux-saga';

import {getBalance, getProjects} from '../../services/backend/queries/projects';
import {ProjectsActions} from '../common/reducerActions';
import {handleSagaErrorGlobalAlertBased} from '../common/utils';

export function* initProjectsPage({
  payload: {workspaceId},
}: PayloadAction<{workspaceId: number}>): Generator {
  try {
    yield put(ProjectsActions.clearErrorsData());
    const balanceData = yield* call(getBalance);
    yield put(ProjectsActions.updateBalanceData(balanceData));
    const projects = yield* call(getProjects, workspaceId);
    yield put(ProjectsActions.updateProjectsData(projects));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
    throw error
  }
}
