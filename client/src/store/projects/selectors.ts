import {BalanceModel, ProjectModel} from '../../services/models';
import {RootState} from '../store';

import {ProjectsPageErrorsData} from './types';

export const selectProjectsPageBalance = (state: RootState): BalanceModel => state.projects.balance;

export const selectProjects = (state: RootState): Array<ProjectModel> => state.projects.projects;

export const selectProjectsPageErrorsData = (state: RootState): ProjectsPageErrorsData =>
  state.projects.errors;
