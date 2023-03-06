import {EventsWithStack} from '../../utils/events';
import {RootState} from '../store';

import {
  PROJECT_MODIFY_EVENTS,
  PROJECT_MODIFY_PAGE_ERRORS_SECTIONS,
  ProjectModifyFormData,
  ProjectModifyGenerationLanguages,
  ProjectModifyPageErrorsData,
} from './types';

export const selectProjectModifyFormFieldsData = (state: RootState): ProjectModifyFormData =>
  state.projectModify.formFields;

export const selectProjectModifyPageGenerationLanguages = (
  state: RootState,
): ProjectModifyGenerationLanguages => state.projectModify.generationLanguages;

export const selectProjectModifyCreateErrorsData = (
  state: RootState,
): ProjectModifyPageErrorsData[PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.CREATE] =>
  state.projectModify.errors[PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.CREATE];

export const selectProjectModifyUpdateErrorsData = (
  state: RootState,
): ProjectModifyPageErrorsData[PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE] =>
  state.projectModify.errors[PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE];

export const selectProjectModifyPageEvents = (state: RootState) =>
  state.projectModify.events.currEvent;
