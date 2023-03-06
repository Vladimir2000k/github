import {takeEvery} from 'redux-saga/effects';

import {sendAPIIntegrationRequest} from '../apiIntegrationRequest/sagas';
import {login} from '../auth/login/sagas';
import {
  confirmPasswordReset,
  resendEmailForPasswordReset,
  resendEmailConfirmationForPasswordReset,
  sendPasswordResetEmailLink,
} from '../auth/passwordReset/sagas';
import {
  register,
  resendEmailForRegistration,
  confirmEmail,
  resendEmailConfirmationForRegistration,
} from '../auth/registration/sagas';
import {getBlogPosts} from '../blog/sagas';
import {getBlogPostData} from '../blogPost/sagas';
import {sendFeedback} from '../contactUs/sagas';
import {changePassword, initProfilePage, logoutSaga} from '../profile/sagas';
import {
  createProjectSaga,
  deleteProjectSaga,
  getProjectSaga,
  updateProjectSaga,
} from '../projectModify/sagas';
import {initProjectsPage} from '../projects/sagas';
import {getTariffs} from '../tariffs/sagas';
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  updateWorkspace,
} from '../workspaceModify/sagas';
import {initWorkspacesPage} from '../workspaces/sagas';

import {
  APIIntegrationRequestSagaActions,
  LoginSagaActions,
  PasswordResetSagaActions,
  ProfileSagaActions,
  RegistrationSagaActions,
  BlogSagaActions,
  ContactUsSagaActions,
  BlogPostSagaActions,
  TariffsSagaActions,
  ProjectsSagaActions,
  ProjectModifySagaActions,
  WorkspaceModifySagaActions,
  WorkspacesSagaActions,
} from './sagaActions';

export default function* watcherSaga(): Generator {
  yield takeEvery(
    APIIntegrationRequestSagaActions.sendAPIIntegrationRequest,
    sendAPIIntegrationRequest,
  );
  yield takeEvery(LoginSagaActions.login, login);
  yield takeEvery(WorkspaceModifySagaActions.createWorkspace, createWorkspace);
  yield takeEvery(WorkspaceModifySagaActions.updateWorkspace, updateWorkspace);
  yield takeEvery(WorkspaceModifySagaActions.deleteWorkspace, deleteWorkspace);
  yield takeEvery(WorkspaceModifySagaActions.getWorkspace, getWorkspace);
  yield takeEvery(PasswordResetSagaActions.sendPasswordResetEmailLink, sendPasswordResetEmailLink);
  yield takeEvery(PasswordResetSagaActions.confirmPasswordReset, confirmPasswordReset);
  yield takeEvery(PasswordResetSagaActions.resendEmail, resendEmailForPasswordReset);
  yield takeEvery(
    PasswordResetSagaActions.resendEmailConfirmation,
    resendEmailConfirmationForPasswordReset,
  );
  yield takeEvery(RegistrationSagaActions.register, register);
  yield takeEvery(RegistrationSagaActions.resendEmail, resendEmailForRegistration);
  yield takeEvery(
    RegistrationSagaActions.resendEmailConfirmation,
    resendEmailConfirmationForRegistration,
  );
  yield takeEvery(RegistrationSagaActions.confirmEmail, confirmEmail);
  yield takeEvery(BlogSagaActions.getBlogPosts, getBlogPosts);
  yield takeEvery(BlogPostSagaActions.getBlogPostData, getBlogPostData);
  yield takeEvery(TariffsSagaActions.getTariffs, getTariffs);
  yield takeEvery(ContactUsSagaActions.sendFeedback, sendFeedback);
  yield takeEvery(ProfileSagaActions.initProfilePage, initProfilePage);
  yield takeEvery(ProfileSagaActions.logout, logoutSaga);
  yield takeEvery(ProfileSagaActions.changePassword, changePassword);
  yield takeEvery(ProjectsSagaActions.initProjectsPage, initProjectsPage);
  yield takeEvery(ProjectsSagaActions.getProject, getProjectSaga);
  yield takeEvery(ProjectModifySagaActions.createProject, createProjectSaga);
  yield takeEvery(ProjectModifySagaActions.updateProject, updateProjectSaga);
  yield takeEvery(ProjectModifySagaActions.deleteProject, deleteProjectSaga);
  yield takeEvery(WorkspacesSagaActions.initWorkspacesPage, initWorkspacesPage);
}
