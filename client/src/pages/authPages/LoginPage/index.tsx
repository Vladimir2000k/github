import React, {useCallback, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../../components/Footer';
import Header from '../../../components/LandingHeader';
import LandingPagesContainer from '../../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../../components/LandingPagesContentContainer';
import OptimizedPNGImage from '../../../components/OptimizedPNGImage';
import CustomButton from '../../../components/uiKit/Button';
import ErrorMessage from '../../../components/uiKit/ErrorMessage';
import CustomInput from '../../../components/uiKit/Input';
import CustomLink from '../../../components/uiKit/Link';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../../components/uiKit/TextBlock';
import {ReactComponent as Lock_icon} from '../../../resources/icons/Lock.svg';
import {ReactComponent as Mail_icon} from '../../../resources/icons/Mail.svg';
import Auth_pages_image from '../../../resources/images/Auth_pages_image.png';
import {useAuth} from '../../../services/authState/authProvider';
import {
  selectLoginFormFieldsData,
  selectLoginPageCurrentEvent,
  selectLoginPageErrorsData,
} from '../../../store/auth/login/selectors';
import {LOGIN_EVENTS} from '../../../store/auth/login/types';
import {LoginActions} from '../../../store/common/reducerActions';
import {LoginSagaActions} from '../../../store/common/sagaActions';

const LoginPageContentContainer = styled(LandingPagesContentContainer)`
  position: relative;
  margin-left: 92px;
  margin-top: 134px;
`;

const LoginPageHeadingText = styled.div`
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  color: #333333;
`;

const LoginPageLeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: #333333;
`;

const LoginPageRequiredFieldsNotification = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  color: #848199; // TODO
  margin-top: 20px;
`;

const LoginPageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  width: 338px;
`;

const LoginPageNonFieldErrorsTextBlock = styled(ErrorMessage)`
  margin-top: 10px;
`;

const LoginPageSubmitButton = styled(CustomButton)`
  height: 56px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const LoginPageLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const LoginPageLink = styled(CustomLink)`
  width: fit-content;
  opacity: 0.7;
  color: #333333;
`;

const LoginPageImage = styled(OptimizedPNGImage)`
  position: absolute;
  top: -101px;
  right: 0;
  z-index: -50;
  width: 615px;
  height: 495px;
`;

const LoginPage = (): JSX.Element => {
  const {email, password} = useSelector(selectLoginFormFieldsData);
  const {
    nonFieldErrors,
    email: emailErrors,
    password: passwordErrors,
  } = useSelector(selectLoginPageErrorsData);
  const event = useSelector(selectLoginPageCurrentEvent);

  const auth = useAuth();

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(LoginActions.clearFormFieldsData());
    dispatch(LoginActions.clearErrorsData());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case LOGIN_EVENTS.NAVIGATE_TO_WORKSPACES:
          dispatch(LoginActions.handleCurrentEvent());
          history.push('/workspaces');
          break;
        case LOGIN_EVENTS.NAVIGATE_TO_RESEND_EMAIL:
          dispatch(LoginActions.handleCurrentEvent());
          history.push('/auth/registration/resend-email');
          break;
        case LOGIN_EVENTS.ERROR:
          dispatch(LoginActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history, auth.currentUserData]);

  const handleInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        LoginActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <LandingPagesContainer>
      <Header />
      <LoginPageContentContainer>
        <LoginPageHeadingText>{t('auth.login.headingText')}</LoginPageHeadingText>
        <LoginPageLeadText type={TEXT_BLOCK_TYPE.P7}>{t('auth.login.leadText')}</LoginPageLeadText>
        <LoginPageRequiredFieldsNotification>
          {t('auth.login.formRequiredFieldsNotification')}
        </LoginPageRequiredFieldsNotification>
        <LoginPageNonFieldErrorsTextBlock errors={nonFieldErrors} />
        <LoginPageFormContainer>
          <CustomInput
            name="email"
            value={email}
            errors={emailErrors}
            placeholder={t('auth.login.emailEntryPlaceholder')}
            placeholderIcon={Mail_icon}
            onChange={handleInputChange}
            isRequired={true}
          />
          <CustomInput
            name="password"
            value={password}
            type="password"
            errors={passwordErrors}
            placeholder={t('auth.login.passwordEntryPlaceholder')}
            placeholderIcon={Lock_icon}
            onChange={handleInputChange}
            isRequired={true}
          />
          <LoginPageSubmitButton
            className="login-button"
            title={t('auth.login.submitFormButtonText')}
            onClick={() => dispatch(LoginSagaActions.login())}
          />
        </LoginPageFormContainer>
        <LoginPageLinksContainer>
          <LoginPageLink to="/auth/password-reset" activeClassName="activeNavButton">
            {t('auth.login.forgotPassword')}
          </LoginPageLink>
          <LoginPageLink to="/auth/registration" activeClassName="activeNavButton">
            {t('auth.login.register')}
          </LoginPageLink>
        </LoginPageLinksContainer>
        <LoginPageImage src={Auth_pages_image} />
      </LoginPageContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default LoginPage;
