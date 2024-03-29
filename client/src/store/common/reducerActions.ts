import apiIntegrationRequestSlice from '../apiIntegrationRequest/reducers';
import appGlobalSlice from '../appGlobal/reducers';
import appGlobalModalsSlice from '../appGlobalModals/reducers';
import loginSlice from '../auth/login/reducers';
import passwordResetSlice from '../auth/passwordReset/reducers';
import registrationSlice from '../auth/registration/reducers';
import blogSlice from '../blog/reducers';
import blogPostSlice from '../blogPost/reducers';
import contactUsSlice from '../contactUs/reducers';
import profileSlice from '../profile/reducers';
import projectModifySliceSlice from '../projectModify/reducers';
import projectsSlice from '../projects/reducers';
import tariffsSlice from '../tariffs/reducers';
import workspaceModifySlice from '../workspaceModify/reducers';
import workspacesSlice from '../workspaces/reducers';

export const APIIntegrationRequestActions = apiIntegrationRequestSlice.actions;
export const AppGlobalActions = appGlobalSlice.actions;
export const LoginActions = loginSlice.actions;
export const PasswordResetActions = passwordResetSlice.actions;
export const RegistrationActions = registrationSlice.actions;
export const BlogActions = blogSlice.actions;
export const BlogPostActions = blogPostSlice.actions;
export const ContactUsActions = contactUsSlice.actions;
export const ProjectModifyActions = projectModifySliceSlice.actions;
export const ProjectsActions = projectsSlice.actions;
export const TariffsActions = tariffsSlice.actions;
export const BlogPageActions = blogSlice.actions;
export const ContactUsPageActions = contactUsSlice.actions;
export const BlogPostPageActions = blogPostSlice.actions;
export const ProfileActions = profileSlice.actions;
export const TariffsPageActions = tariffsSlice.actions;
export const WorkspaceModifyActions = workspaceModifySlice.actions;
export const WorkspacesActions = workspacesSlice.actions;
export const AppGlobalModalsActions = appGlobalModalsSlice.actions;
// TODO
