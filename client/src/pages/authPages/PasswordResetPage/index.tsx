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
import {ReactComponent as Mail_icon} from '../../../resources/icons/Mail.svg';
import Auth_pages_image from '../../../resources/images/Auth_pages_image.png';
import {
  selectPasswordResetFormFieldsData,
  selectPasswordResetPageCurrentEvent,
  selectPasswordResetPageErrorsData,
} from '../../../store/auth/passwordReset/selectors';
import {PASSWORD_RESET_EVENTS} from '../../../store/auth/passwordReset/types';
import {PasswordResetActions} from '../../../store/common/reducerActions';
import {PasswordResetSagaActions} from '../../../store/common/sagaActions';

const PasswordResetPageContentContainer = styled(LandingPagesContentContainer)`
  position: relative;
  margin-left: 92px;
  margin-top: 143px;
  margin-bottom: 134px;
`;

const PasswordResetPageHeadingText = styled.div`
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  color: ${(props) => props.theme.colors.grey20};
`;

const PasswordResetPageLeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.grey20};
`;

const PasswordResetPageRequiredFieldsNotification = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  color: ${(props) => props.theme.colors.blueishGrey55};
  margin-top: 20px;
`;

const PasswordResetPageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  width: 338px;
`;

const PasswordResetPageNonFieldErrorsTextBlock = styled(ErrorMessage)`
  margin-top: 10px;
`;

const PasswordResetPageSubmitButton = styled(CustomButton)`
  height: 56px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const PasswordResetPageLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const PasswordResetPageLink = styled(CustomLink)`
  width: fit-content;
  opacity: 0.7;
  color: ${(props) => props.theme.colors.grey20};
`;

const PasswordResetPageImage = styled(OptimizedPNGImage)`
  position: absolute;
  top: -110px;
  right: 0;
  z-index: -50;
  width: 615px;
  height: 495px;
`;

const PasswordResetPage = (): JSX.Element => {
  const {email} = useSelector(selectPasswordResetFormFieldsData);
  const {nonFieldErrors, email: emailErrors} = useSelector(selectPasswordResetPageErrorsData);
  const event = useSelector(selectPasswordResetPageCurrentEvent);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(PasswordResetActions.clearFormFieldsData());
    dispatch(PasswordResetActions.clearErrorsData());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case PASSWORD_RESET_EVENTS.NAVIGATE_TO_RESEND_EMAIL:
          dispatch(PasswordResetActions.handleCurrentEvent());
          history.push('/auth/password-reset/resend-email');
          break;
        case PASSWORD_RESET_EVENTS.ERROR:
          dispatch(PasswordResetActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history]);

  const onInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        PasswordResetActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <LandingPagesContainer>
      <Header />
      <PasswordResetPageContentContainer>
        <PasswordResetPageHeadingText>
          {t('auth.passwordReset.general.headingText')}
        </PasswordResetPageHeadingText>
        <PasswordResetPageLeadText type={TEXT_BLOCK_TYPE.P7}>
          {t('auth.passwordReset.general.leadText')}
        </PasswordResetPageLeadText>
        <PasswordResetPageRequiredFieldsNotification>
          {t('auth.passwordReset.general.formRequiredFieldsNotification')}
        </PasswordResetPageRequiredFieldsNotification>
        <PasswordResetPageNonFieldErrorsTextBlock errors={nonFieldErrors} />
        <PasswordResetPageFormContainer>
          <CustomInput
            name="email"
            value={email}
            errors={emailErrors}
            placeholder={t('auth.passwordReset.general.emailEntryPlaceholder')}
            placeholderIcon={Mail_icon}
            onChange={onInputChange}
            isRequired={true}
          />
          <PasswordResetPageSubmitButton
            className="password-reset-button"
            title={t('auth.passwordReset.general.submitFormButtonText')}
            onClick={() => dispatch(PasswordResetSagaActions.sendPasswordResetEmailLink())}
          />
        </PasswordResetPageFormContainer>
        <PasswordResetPageLinksContainer>
          <PasswordResetPageLink to="/auth/login" activeClassName="activeNavButton">
            {t('auth.passwordReset.general.enter')}
          </PasswordResetPageLink>
          <PasswordResetPageLink to="/auth/registration" activeClassName="activeNavButton">
            {t('auth.passwordReset.general.register')}
          </PasswordResetPageLink>
        </PasswordResetPageLinksContainer>
        <PasswordResetPageImage src={Auth_pages_image} />
      </PasswordResetPageContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default PasswordResetPage;
