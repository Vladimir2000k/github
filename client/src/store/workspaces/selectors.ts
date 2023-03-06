import {WorkspaceModel} from '../../services/models';
import {Event, EventsWithStack} from '../../utils/events';
import {RootState} from '../store';

import {WORKSPACES_EVENTS, WorkspacesPageErrorsData} from './types';

export const selectWorkspaces = (state: RootState): Array<WorkspaceModel> =>
  state.workspaces.workspaces;

export const selectWorkspacesPageErrorsData = (state: RootState): WorkspacesPageErrorsData =>
  state.workspaces.errors;

export const selectWorkspacesPageCurrentEvent = (state: RootState): Event<WORKSPACES_EVENTS> => {
  return state.workspaces.events.currEvent;
};
