import {RootState} from '../store';

import {
  WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS,
  WorkspaceModifyFormData,
  WorkspaceModifyPageErrorsData,
  WorkspaceOwner,
} from './types';

export const selectWorkspaceModifyFormFieldsData = (state: RootState): WorkspaceModifyFormData =>
  state.workspaceModify.formFields;

export const selectWorkspaceModifyCreationDate = (state: RootState): string =>
  state.workspaceModify.creationDate;

export const selectWorkspaceModifyOwner = (state: RootState): WorkspaceOwner =>
  state.workspaceModify.owner;

export const selectWorkspaceModifyCreateErrorsData = (
  state: RootState,
): WorkspaceModifyPageErrorsData[WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.CREATE] =>
  state.workspaceModify.errors[WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.CREATE];

export const selectWorkspaceModifyUpdateErrorsData = (
  state: RootState,
): WorkspaceModifyPageErrorsData[WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE] =>
  state.workspaceModify.errors[WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE];

export const selectWorkspaceModifyPageEvents = (state: RootState) =>
  state.workspaceModify.events.currEvent;
