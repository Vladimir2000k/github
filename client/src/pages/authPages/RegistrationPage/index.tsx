import React, {useCallback, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
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
import Registration_page_image from '../../../resources/images/Auth_pages_image.png';
import {
  selectRegistrationFormFieldsData,
  selectRegistrationPagesCurrentEvent,
  selectRegistrationPageErrorsData,
} from '../../../store/auth/registration/selectors';
import {REGISTRATION_EVENTS} from '../../../store/auth/registration/types';
import {RegistrationActions} from '../../../store/common/reducerActions';
import {RegistrationSagaActions} from '../../../store/common/sagaActions';

const RegistrationPageContentContainer = styled(LandingPagesContentContainer)`
  position: relative;
  margin-left: 92px;
  margin-top: 53px;
`;

const RegistrationPageHeadingText = styled.div`
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  color: ${(props) => props.theme.colors.grey20};
`;

const RegistrationPageLeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.grey20};
`;

const RegistrationPageRequiredFieldsNotification = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  color: ${(props) => props.theme.colors.blueishGrey55};
  margin-top: 30px;
`;

const RegistrationPageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 7px;
  width: 338px;
`;

const RegistrationPageNonFieldErrorsTextBlock = styled(ErrorMessage)`
  margin-top: 10px;
`;

const RegistrationPageSubmitButton = styled(CustomButton)`
  height: 56px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const RegistrationPageLinksContainer = styled.div`
  width: 337px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
`;

const RegistrationPageLicenseAgreement = styled.div`
  max-width: 337px;
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  color: ${(props) => props.theme.colors.grey60};
`;

const RegistrationPageLicenseAgreementLink = styled(NavLink)`
  height: fit-content;

  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  color: ${(props) => props.theme.colors.grey60};
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const RegistrationPageImage = styled(OptimizedPNGImage)`
  position: absolute;
  top: -20px;
  right: 0;
  z-index: -50;
  width: 615px;
  height: 495px;
`;

const RegistrationPage = (): JSX.Element => {
  const {email, password, passwordConfirmation} = useSelector(selectRegistrationFormFieldsData);
  const event = useSelector(selectRegistrationPagesCurrentEvent);
  const {
    nonFieldErrors,
    email: emailErrors,
    password1: passwordErrors,
    password2: passwordConfirmationErrors,
  } = useSelector(selectRegistrationPageErrorsData);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(RegistrationActions.clearFormFieldsData());
    dispatch(RegistrationActions.clearErrorsData());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case REGISTRATION_EVENTS.NAVIGATE_TO_RESEND_EMAIL:
          dispatch(RegistrationActions.handleCurrentEvent());
          history.push('/auth/registration/resend-email');
          break;
        case REGISTRATION_EVENTS.ERROR:
          dispatch(RegistrationActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history]);

  const handleInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        RegistrationActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  const handleRegisterButtonClick = useCallback(() => {
    dispatch(RegistrationSagaActions.register());
  }, [dispatch]);

  // TODO terms of service link

  return (
    <LandingPagesContainer>
      <Header />
      <RegistrationPageContentContainer>
        <RegistrationPageHeadingText>
          {t('auth.registration.general.headingText')}
        </RegistrationPageHeadingText>
        <RegistrationPageLeadText type={TEXT_BLOCK_TYPE.P7}>
          {t('auth.registration.general.leadText')}
        </RegistrationPageLeadText>
        <RegistrationPageRequiredFieldsNotification>
          {t('auth.registration.general.formRequiredFieldsNotification')}
        </RegistrationPageRequiredFieldsNotification>
        <RegistrationPageNonFieldErrorsTextBlock errors={nonFieldErrors} />
        <RegistrationPageFormContainer>
          <CustomInput
            name="email"
            value={email}
            errors={emailErrors}
            placeholder={t('auth.registration.general.emailEntryPlaceholder')}
            placeholderIcon={Mail_icon}
            onChange={handleInputChange}
            isRequired={true}
          />
          <CustomInput
            name="password"
            value={password}
            type="password"
            errors={passwordErrors}
            placeholder={t('auth.registration.general.passwordEntryPlaceholder')}
            placeholderIcon={Lock_icon}
            onChange={handleInputChange}
            isRequired={true}
          />
          <CustomInput
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            errors={passwordConfirmationErrors}
            placeholder={t('auth.registration.general.passwordConfirmationEntryPlaceholder')}
            placeholderIcon={Mail_icon}
            onChange={handleInputChange}
            isRequired={true}
          />
          <RegistrationPageSubmitButton
            title={t('auth.registration.general.submitFormButtonText')}
            onClick={handleRegisterButtonClick}
          />
        </RegistrationPageFormContainer>
        <RegistrationPageLinksContainer>
          <RegistrationPageLicenseAgreement>
            {t('auth.registration.general.licenseAgreement')}{' '}
            <RegistrationPageLicenseAgreementLink to="/termsOfService">
              {t('auth.registration.general.termsOfService')}
            </RegistrationPageLicenseAgreementLink>{' '}
            {t('auth.registration.general.conjunctionAnd')}{' '}
            <RegistrationPageLicenseAgreementLink
              to="/docs/Privacy%20ai%20Disraeli.pdf"
              target="_blank">
              {t('auth.registration.general.privacyPolicy')}
            </RegistrationPageLicenseAgreementLink>
          </RegistrationPageLicenseAgreement>
          <CustomLink to="/auth/login" activeClassName="activeNavButton">
            {t('auth.registration.general.alreadyHaveAnAccountThenLogin')}
          </CustomLink>
        </RegistrationPageLinksContainer>
        <RegistrationPageImage src={Registration_page_image} />
      </RegistrationPageContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default RegistrationPage;
