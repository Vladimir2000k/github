import {enableMapSet} from 'immer';
import {combineReducers} from 'redux';

import apiIntegrationRequestSlice, {
  API_INTEGRATION_REQUEST_REDUCER_NAME,
} from '../apiIntegrationRequest/reducers';
import appGlobalSlice, {APP_GLOBAL_REDUCER_NAME} from '../appGlobal/reducers';
import appGlobalModalsSlice, {APP_GLOBAL_MODALS_REDUCER_NAME} from '../appGlobalModals/reducers';
import loginSlice, {LOGIN_REDUCER_NAME} from '../auth/login/reducers';
import passwordResetSlice, {PASSWORD_RESET_REDUCER_NAME} from '../auth/passwordReset/reducers';
import registrationSlice, {REGISTRATION_REDUCER_NAME} from '../auth/registration/reducers';
import blogSlice, {BLOG_REDUCER_NAME} from '../blog/reducers';
import blogPostSlice, {BLOG_POST_PAGE_REDUCER_NAME} from '../blogPost/reducers';
import contactUsSlice, {CONTACT_US_REDUCER_NAME} from '../contactUs/reducers';
import projectModifySlice, {PROJECT_MODIFY_PAGE_REDUCER_NAME} from '../projectModify/reducers';
import projectsSlice, {PROJECTS_REDUCER_NAME} from '../projects/reducers';
import profileSlice, {PROFILE_REDUCER_NAME} from '../profile/reducers';
import tariffsSlice, {TARIFFS_PAGE_REDUCER_NAME} from '../tariffs/reducers';
import workspaceModifySlice, {
  WORKSPACE_MODIFY_PAGE_REDUCER_NAME,
} from '../workspaceModify/reducers';
import workspacesSlice, {WORKSPACES_REDUCER_NAME} from '../workspaces/reducers';

enableMapSet();

const appReducer = combineReducers({
  [API_INTEGRATION_REQUEST_REDUCER_NAME]: apiIntegrationRequestSlice.reducer,
  [LOGIN_REDUCER_NAME]: loginSlice.reducer,
  [REGISTRATION_REDUCER_NAME]: registrationSlice.reducer,
  [PASSWORD_RESET_REDUCER_NAME]: passwordResetSlice.reducer,
  [APP_GLOBAL_REDUCER_NAME]: appGlobalSlice.reducer,
  [BLOG_REDUCER_NAME]: blogSlice.reducer,
  [BLOG_POST_PAGE_REDUCER_NAME]: blogPostSlice.reducer,
  [PROJECT_MODIFY_PAGE_REDUCER_NAME]: projectModifySlice.reducer,
  [PROJECTS_REDUCER_NAME]: projectsSlice.reducer,
  [PROFILE_REDUCER_NAME]: profileSlice.reducer,
  [TARIFFS_PAGE_REDUCER_NAME]: tariffsSlice.reducer,
  [CONTACT_US_REDUCER_NAME]: contactUsSlice.reducer,
  [WORKSPACE_MODIFY_PAGE_REDUCER_NAME]: workspaceModifySlice.reducer,
  [WORKSPACES_REDUCER_NAME]: workspacesSlice.reducer,
  [APP_GLOBAL_MODALS_REDUCER_NAME]: appGlobalModalsSlice.reducer,
});

const rootReducer = (state, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
