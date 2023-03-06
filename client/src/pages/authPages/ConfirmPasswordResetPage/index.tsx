import React, {useCallback, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../../components/Footer';
import Header from '../../../components/LandingHeader';
import LandingPagesContainer from '../../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../../components/LandingPagesContentContainer';
import OptimizedPNGImage from '../../../components/OptimizedPNGImage';
import CustomButton from '../../../components/uiKit/Button';
import ErrorMessage from '../../../components/uiKit/ErrorMessage';
import CustomInput from '../../../components/uiKit/Input';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../../components/uiKit/TextBlock';
import {ReactComponent as Lock_icon} from '../../../resources/icons/Lock.svg';
import Auth_pages_image from '../../../resources/images/Auth_pages_image.png';
import {
  selectConfirmPasswordResetPageErrorsData,
  selectPasswordResetFormFieldsData,
  selectPasswordResetPageCurrentEvent,
} from '../../../store/auth/passwordReset/selectors';
import {PASSWORD_RESET_EVENTS} from '../../../store/auth/passwordReset/types';
import {PasswordResetActions} from '../../../store/common/reducerActions';
import {PasswordResetSagaActions} from '../../../store/common/sagaActions';

const ContentContainer = styled(LandingPagesContentContainer)`
  position: relative;
  margin-left: 92px;
  margin-top: 143px;
  margin-bottom: 136px;
`;

const HeadingText = styled.div`
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  color: ${(props) => props.theme.colors.grey20};
`;

const LeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.grey20};
`;

const RequiredFieldsNotification = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  color: ${(props) => props.theme.colors.blueishGrey55};
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 338px;
`;

const NonFieldErrorsTextBlock = styled(ErrorMessage)`
  margin-top: 10px;
`;

const SubmitButton = styled(CustomButton)`
  height: 56px;
  margin-top: 30px;

  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const Image = styled(OptimizedPNGImage)`
  position: absolute;
  top: -110px;
  right: 0;
  z-index: -50;
  width: 615px;
  height: 495px;
`;

const ConfirmPasswordResetPage = (): JSX.Element => {
  const {password1: password, password2: passwordConfirmation} = useSelector(
    selectPasswordResetFormFieldsData,
  );
  const {
    nonFieldErrors,
    password1: passwordErrors,
    password2: passwordConfirmationErrors,
  } = useSelector(selectConfirmPasswordResetPageErrorsData);
  const event = useSelector(selectPasswordResetPageCurrentEvent);

  const dispatch = useDispatch();

  const history = useHistory();

  const {uid, token} = useParams<{uid: string; token: string}>();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(PasswordResetActions.clearFormFieldsData());
    dispatch(PasswordResetActions.clearErrorsData());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case PASSWORD_RESET_EVENTS.NAVIGATE_TO_LOGIN:
          dispatch(PasswordResetActions.handleCurrentEvent());
          history.push('/auth/login');
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
      <ContentContainer>
        <HeadingText>{t('auth.passwordReset.confirmPasswordReset.headingText')}</HeadingText>
        <LeadText type={TEXT_BLOCK_TYPE.P7}>
          {t('auth.passwordReset.confirmPasswordReset.leadText')}
        </LeadText>
        <RequiredFieldsNotification>
          {t('auth.passwordReset.confirmPasswordReset.formRequiredFieldsNotification')}
        </RequiredFieldsNotification>
        <NonFieldErrorsTextBlock errors={nonFieldErrors} />
        <FormContainer>
          <CustomInput
            name="password1"
            type="password"
            value={password}
            errors={passwordErrors}
            placeholder={t('auth.passwordReset.confirmPasswordReset.passwordEntryPlaceholder')}
            placeholderIcon={Lock_icon}
            onChange={onInputChange}
            isRequired={true}
          />
          <CustomInput
            name="password2"
            type="password"
            value={passwordConfirmation}
            errors={passwordConfirmationErrors}
            placeholder={t(
              'auth.passwordReset.confirmPasswordReset.passwordConfirmationEntryPlaceholder',
            )}
            placeholderIcon={Lock_icon}
            onChange={onInputChange}
            isRequired={true}
          />
        </FormContainer>
        <SubmitButton
          className="password-reset-button"
          title={t('auth.passwordReset.confirmPasswordReset.submitFormButtonText')}
          onClick={() => dispatch(PasswordResetSagaActions.confirmPasswordReset({uid, token}))}
        />
        <Image src={Auth_pages_image} />
      </ContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default ConfirmPasswordResetPage;
