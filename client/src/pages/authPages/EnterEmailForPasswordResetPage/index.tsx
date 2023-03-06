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
import {ReactComponent as Mail_icon} from '../../../resources/icons/Mail.svg';
import Sending_mail_image from '../../../resources/images/Sending_mail_image.png';
import {
  selectEnterEmailForPasswordResetPageErrorsData,
  selectPasswordResetPageCurrentEvent,
} from '../../../store/auth/passwordReset/selectors';
import {PASSWORD_RESET_EVENTS} from '../../../store/auth/passwordReset/types';
import {selectRegistrationFormFieldsData} from '../../../store/auth/registration/selectors';
import {PasswordResetActions, RegistrationActions} from '../../../store/common/reducerActions';
import {PasswordResetSagaActions} from '../../../store/common/sagaActions';

const EnterEmailPageContentContainer = styled(LandingPagesContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EnterEmailPageImage = styled(OptimizedPNGImage)`
  width: 309px;
  height: 225px;
  margin-top: 33px;
`;

const EnterEmailPageHeadingText = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey20};
`;

const EnterEmailPageRequiredFieldsNotification = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  color: ${(props) => props.theme.colors.blueishGrey55};
  margin-top: 30px;
`;

const EnterEmailPageNonFieldErrorsTextBlock = styled(ErrorMessage)`
  width: 338px;
  margin-top: 10px;
`;

const EnterEmailPageInputContainer = styled.div`
  width: 338px;
  margin-top: 30px;
`;

const EnterEmailPageButton = styled(CustomButton)`
  width: 338px;
  margin-top: 20px;
`;

const EnterEmailForPasswordResetPage = (): JSX.Element => {
  const {email} = useSelector(selectRegistrationFormFieldsData);
  const {nonFieldErrors, email: emailErrors} = useSelector(
    selectEnterEmailForPasswordResetPageErrorsData,
  );
  const event = useSelector(selectPasswordResetPageCurrentEvent);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
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
      dispatch(RegistrationActions.updateFormFieldsData({[name]: value}));
    },
    [dispatch],
  );

  const onSubmitFormButtonClick = useCallback(() => {
    dispatch(PasswordResetSagaActions.resendEmailConfirmation());
  }, [dispatch]);

  return (
    <LandingPagesContainer>
      <Header />
      <EnterEmailPageContentContainer>
        <EnterEmailPageImage src={Sending_mail_image} />
        <EnterEmailPageHeadingText>
          {t('auth.passwordReset.enterEmail.headingText')}
        </EnterEmailPageHeadingText>
        <EnterEmailPageRequiredFieldsNotification>
          {t('auth.passwordReset.enterEmail.formRequiredFieldsNotification')}
        </EnterEmailPageRequiredFieldsNotification>
        {nonFieldErrors?.length > 0 && (
          <EnterEmailPageNonFieldErrorsTextBlock errors={nonFieldErrors} />
        )}
        <EnterEmailPageInputContainer>
          <CustomInput
            name="email"
            value={email}
            errors={emailErrors}
            placeholder={t('auth.passwordReset.enterEmail.emailEntryPlaceholder')}
            placeholderIcon={Mail_icon}
            onChange={onInputChange}
            isRequired={true}
          />
        </EnterEmailPageInputContainer>
        <EnterEmailPageButton
          title={t('auth.passwordReset.enterEmail.submitFormButtonText')}
          onClick={onSubmitFormButtonClick}
        />
      </EnterEmailPageContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default EnterEmailForPasswordResetPage;
