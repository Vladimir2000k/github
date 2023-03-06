import React, {useEffect} from 'react';

import i18n from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

import SiteGlobalModals from '../components/modals/siteGlobalModals';
import {PrivateRoute} from '../navigation/utils';
import {selectAppGlobalEvent, selectAppLanguage} from '../store/appGlobal/selectors';
import {APP_GLOBAL_EVENTS} from '../store/appGlobal/types';
import {AppGlobalActions} from '../store/common/reducerActions';

import APIIntegrationRequestPage from './APIIntegrationRequestPage';
import ConfirmEmailForRegistrationPage from './authPages/ConfirmEmailPage';
import ConfirmPasswordResetPage from './authPages/ConfirmPasswordResetPage';
import EnterEmailForPasswordResetPage from './authPages/EnterEmailForPasswordResetPage';
import EnterEmailForRegistrationPage from './authPages/EnterEmailForRegistrationPage';
import LoginPage from './authPages/LoginPage';
import PasswordResetPage from './authPages/PasswordResetPage';
import RegistrationPage from './authPages/RegistrationPage';
import ResendEmailForPasswordResetPage from './authPages/ResendEmailForPasswordResetPage';
import ResendEmailForRegistrationPage from './authPages/ResendEmailForRegistrationPage';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import ContactUsPage from './ContactUsPage';
import GenerationPage from './GenerationPage';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage';
import ProjectModifyPage from './ProjectModifyPage';
import ProjectsPage from './ProjectsPage';
import TariffsPage from './TariffsPage';
import WorkspaceModifyPage from './WorkspaceModifyPage';
import WorkspacesPage from './WorkspacesPage';

const Router = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentLanguage = useSelector(selectAppLanguage);

  const appGlobalEvent = useSelector(selectAppGlobalEvent);
  useEffect(() => {
    if (appGlobalEvent) {
      switch (appGlobalEvent.type) {
        case APP_GLOBAL_EVENTS.RELOGIN_REQUIRED:
          dispatch(AppGlobalActions.handleCurrentEvent());
          history.push('/auth/login');
          break;
      }
    }
  }, [dispatch, appGlobalEvent, history]);

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);
  

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/auth/login">
          <LoginPage />
        </Route>
        <Route exact path="/auth/password-reset/enter-email">
          <EnterEmailForPasswordResetPage />
        </Route>
        <Route exact path="/auth/password-reset/resend-email">
          <ResendEmailForPasswordResetPage />
        </Route>
        <Route exact path="/auth/registration">
          <RegistrationPage />
        </Route>
        <Route exact path="/auth/registration/resend-email">
          <ResendEmailForRegistrationPage />
        </Route>
        <Route exact path="/auth/registration/enter-email">
          <EnterEmailForRegistrationPage />
        </Route>
        <Route exact path="/auth/confirm-email/:emailConfirmationKey">
          <ConfirmEmailForRegistrationPage />
        </Route>
        <PrivateRoute exact path="/project-modify/:workspaceId">
          <ProjectModifyPage creation={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/project-modify/:workspaceId/project/:projectId">
          <ProjectModifyPage />
        </PrivateRoute>
        <PrivateRoute exact path="/workspaces">
          <WorkspacesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/workspaces/:workspaceId">
          <ProjectsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/workspace-modify">
          <WorkspaceModifyPage creation={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/workspace-modify/:workspaceId">
          <WorkspaceModifyPage />
        </PrivateRoute>
        <Route exact path="/auth/password-reset">
          <PasswordResetPage />
        </Route>
        <Route exact path="/auth/confirm-password-reset/:uid/:token">
          <ConfirmPasswordResetPage />
        </Route>
        <Route exact path="/tariffs">
          <TariffsPage />
        </Route>
        <Route exact path="/contact-us">
          <ContactUsPage />
        </Route>
        <Route exact path="/blog">
          <BlogPage />
        </Route>
        <Route exact path="/blog/:blogPostId">
          <BlogPostPage />
        </Route>
        <PrivateRoute exact path="/profile">
          <ProfilePage />
        </PrivateRoute>
        <Route exact path="/help">
          <LandingPage />
        </Route>
        <Route exact path="/privacy-policy">
          <LandingPage />
        </Route>
        <Route exact path="/api-integration-request">
          <APIIntegrationRequestPage />
        </Route>
        <PrivateRoute exact path="/workspaces/:workspaceId/projects/:projectId">
          <GenerationPage />
        </PrivateRoute>
        <Redirect from="*" to="/" />
      </Switch>
      <SiteGlobalModals />
    </div>
  );
};

export default Router;
