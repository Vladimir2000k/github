// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';
import {t} from 'i18next';
import {call, put, select} from 'typed-redux-saga';

import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
} from '../../services/backend/queries/projects';
import {AppGlobalModalsActions, ProjectModifyActions} from '../common/reducerActions';
import {ProjectsSagaActions} from '../common/sagaActions';
import {handleSagaErrorGlobalAlertBased, handleSagaErrorStateBased} from '../common/utils';

import {
  selectProjectModifyFormFieldsData,
  selectProjectModifyPageGenerationLanguages,
} from './selectors';
import {
  CreateProjectActionPayload,
  DeleteProjectActionPayload,
  PROJECT_MODIFY_EVENTS,
  PROJECT_MODIFY_PAGE_ERRORS_SECTIONS,
  UpdateProjectActionPayload,
} from './types';

export function* createProjectSaga({
  payload: {workspaceId},
}: PayloadAction<CreateProjectActionPayload>): Generator {
  try {
    yield put(ProjectModifyActions.clearErrors());
    const {name, description} = yield* select(selectProjectModifyFormFieldsData);
    const {sourceLang, targetLang} = yield* select(selectProjectModifyPageGenerationLanguages);
    // @ts-ignore
    const {pk} = yield call(createProject, workspaceId, {
      name,
      description,
      sourceLang,
      targetLang,
    });
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: '',
        localizedMessage: t('projectModify.alerts.projectCreated'),
        acceptButtonAction: ProjectModifyActions.postEvent({
          type: PROJECT_MODIFY_EVENTS.NAVIGATE_TO_GENERATION,
          payload: pk,
        }),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        ProjectModifyActions.updateErrorsData,
        PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.CREATE,
      ),
    );
  }
}

export function* updateProjectSaga({
  payload: {workspaceId, projectId},
}: PayloadAction<UpdateProjectActionPayload>): Generator {
  try {
    yield put(ProjectModifyActions.clearErrors());
    const {name, description} = yield* select(selectProjectModifyFormFieldsData);
    const {sourceLang, targetLang} = yield* select(selectProjectModifyPageGenerationLanguages);
    yield call(updateProject, workspaceId, projectId, {name, description, sourceLang, targetLang});
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: '',
        localizedMessage: t('projectModify.alerts.projectUpdated'),
        acceptButtonAction: ProjectModifyActions.postEvent({
          type: PROJECT_MODIFY_EVENTS.NAVIGATE_TO_WORKSPACE_ROOT,
          payload: {workspaceId},
        }),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        ProjectModifyActions.updateErrorsData,
        PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE,
      ),
    );
  }
}

export function* getProjectSaga({
  payload: {projectId, workspaceId},
}: PayloadAction<{projectId: string; workspaceId: string}>): Generator {
  try {
    yield put(ProjectModifyActions.clearErrors());
    const project = yield* call(getProject, {projectId, workspaceId});
    yield put(ProjectModifyActions.updateFormFieldsData(project));
    yield put(
      ProjectModifyActions.updateGenerationLanguagesData({
        sourceLang: project.sourceLang,
        targetLang: project.targetLang,
      }),
    );
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}

export function* deleteProjectSaga({
  payload: {projectId, workspaceId},
}: PayloadAction<DeleteProjectActionPayload>): Generator {
  try {
    yield* call(deleteProject, workspaceId, projectId);
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: '',
        localizedMessage: t('projectModify.alerts.projectDeleted'),
      }),
    );
    yield put(ProjectsSagaActions.initProjectsPage({workspaceId}));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}
