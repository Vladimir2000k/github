import {TARIFFS} from '../constants/values';

import {GENERATION_LANG_OPTIONS} from '../store/appGlobal/types';

import {UserData} from './authState/types';

export interface BlogPostModel {
  id: number;
  title: string;
  summary: string;
  photo: string;
  views: number;
  dateCreated: string;
}

export interface BlogPostDetailedModel {
  id: number;
  title: string;
  content: string;
  photo: string;
  views: number;
  dateCreated: string;
}

export interface TariffModel {
  id: number;
  type: TARIFFS;
  monthlyPriceForMonth: string;
  monthlyPriceForYear: string;
  priceOfAdditionalForMonth: string;
  priceOfAdditionalForYear: string;
  creditsPerMonth: number;
  languages: number;
  initialBonusCredits: number;
  antiPlagiarismChecks: number;
  maxProjects: number;
  maxWorkspaces: number;
}

export interface BalanceModel {
  pk: number;
  user: number;
  workspacesAdditional: number;
  projectsAdditional: number;
  credits: number;
  antiplagiarismChecks: number;
  plan: TariffModel;
  daysBeforeSubscriptionExpires: number;
  nextPlanProlongationDate: string;
  usedWorkspaces: number;
  usedProjects: number
}

// TODO change sourceLang and targetLang types after brunches is merged
export interface ProjectModel {
  pk: number;
  workspace: number;
  name: string;
  description: string;
  sourceLang: GENERATION_LANG_OPTIONS;
  targetLang: GENERATION_LANG_OPTIONS;
}

export interface WorkspaceModel {
  pk: number;
  name: string;
  creationDate: string;
  projects: Array<ProjectModel>;
  owner: UserData;
}

export interface OwnerModel {
  pk: number;
  email: string;
  firstName?: string;
  lastName?: string;
}
