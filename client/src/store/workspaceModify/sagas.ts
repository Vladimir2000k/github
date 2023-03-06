// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';
import {t} from 'i18next';
import {call, put, select} from 'typed-redux-saga';

import {
  createWorkspace as createWorkspaceQuery,
  deleteWorkspace as deleteWorkspaceQuery,
  getWorkspace as getWorkspaceQuery,
  updateWorkspace as updateWorkspaceQuery,
} from '../../services/backend/queries/workspaces';
import {AppGlobalModalsActions, WorkspaceModifyActions} from '../common/reducerActions';
import {WorkspacesSagaActions} from '../common/sagaActions';
import {handleSagaErrorGlobalAlertBased, handleSagaErrorStateBased} from '../common/utils';

import {selectWorkspaceModifyFormFieldsData} from './selectors';
import {WORKSPACE_MODIFY_EVENTS, WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS} from './types';

export function* createWorkspace(): Generator {
  try {
    const {workspaceName} = yield* select(selectWorkspaceModifyFormFieldsData);
    const {pk: workspaceId} = yield* call(createWorkspaceQuery, workspaceName);
    yield put(
      WorkspaceModifyActions.postEvent({
        type: WORKSPACE_MODIFY_EVENTS.NAVIGATE_TO_WORKSPACE_INTERIOR_PROJECTS,
        payload: workspaceId,
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        WorkspaceModifyActions.updateErrorsData,
        WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.CREATE,
      ),
    );
  }
}

export function* updateWorkspace({payload: {id}}: PayloadAction<{id: number}>): Generator {
  try {
    const {workspaceName} = yield* select(selectWorkspaceModifyFormFieldsData);
    yield* call(updateWorkspaceQuery, {id, workspaceName});
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: '',
        localizedMessage: t('workspaceModify.alerts.workspaceUpdated'),
        acceptButtonAction: WorkspaceModifyActions.postEvent({
          type: WORKSPACE_MODIFY_EVENTS.NAVIGATE_TO_WORKSPACES,
        }),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        WorkspaceModifyActions.updateErrorsData,
        WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE,
      ),
    );
  }
}

export function* deleteWorkspace({payload: {id}}: PayloadAction<{id: number}>): Generator {
  try {
    yield* call(deleteWorkspaceQuery, id);
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: '',
        localizedMessage: t('workspaceModify.alerts.workspaceDeleted'),
      }),
    );
    yield put(WorkspacesSagaActions.initWorkspacesPage());
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}

export function* getWorkspace({payload: {id}}: PayloadAction<{id: number}>): Generator {
  try {
    const {name, owner, creationDate} = yield* call(getWorkspaceQuery, id);
    yield put(WorkspaceModifyActions.updateFormFieldsData({workspaceName: name}));
    yield put(WorkspaceModifyActions.updateOwnerData(owner));
    yield put(WorkspaceModifyActions.updateCreationDate(creationDate));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}
