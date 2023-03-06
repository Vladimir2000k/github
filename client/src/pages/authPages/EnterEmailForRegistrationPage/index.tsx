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
  selectEnterEmailPageErrorsData,
  selectRegistrationFormFieldsData,
  selectRegistrationPagesCurrentEvent,
} from '../../../store/auth/registration/selectors';
import {REGISTRATION_EVENTS} from '../../../store/auth/registration/types';
import {RegistrationActions} from '../../../store/common/reducerActions';
import {RegistrationSagaActions} from '../../../store/common/sagaActions';

const ContentContainer = styled(LandingPagesContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled(OptimizedPNGImage)`
  width: 309px;
  height: 225px;
  margin-top: 33px;
`;

const HeadingText = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey20};
`;

const NonFieldErrorsTextBlock = styled(ErrorMessage)`
  width: 338px;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 338px;
  margin-top: 30px;
`;

const Button = styled(CustomButton)`
  width: 338px;
  margin-top: 20px;
`;

const EnterEmailForRegistrationPage = (): JSX.Element => {
  const {email} = useSelector(selectRegistrationFormFieldsData);
  const {nonFieldErrors, email: emailErrors} = useSelector(selectEnterEmailPageErrorsData);
  const event = useSelector(selectRegistrationPagesCurrentEvent);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(RegistrationActions.clearErrorsData());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case REGISTRATION_EVENTS.NAVIGATE_TO_RESEND_EMAIL:
          dispatch(RegistrationActions.handleCurrentEvent());
          history.push('/auth/registration/resend-email');
          break;
      }
    }
  }, [dispatch, event, history]);

  const onInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        RegistrationActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  const onSubmitFormButtonClick = useCallback(() => {
    dispatch(RegistrationSagaActions.resendEmailConfirmation());
  }, [dispatch]);

  return (
    <LandingPagesContainer>
      <Header />
      <ContentContainer>
        <Image src={Sending_mail_image} />
        <HeadingText>{t('auth.registration.enterEmail.headingText')}</HeadingText>
        {nonFieldErrors?.length > 0 && <NonFieldErrorsTextBlock errors={nonFieldErrors} />}
        <InputContainer>
          <CustomInput
            name="email"
            value={email}
            errors={emailErrors}
            placeholder={t('auth.registration.enterEmail.emailEntryPlaceholder')}
            placeholderIcon={Mail_icon}
            onChange={onInputChange}
            isRequired={true}
          />
        </InputContainer>
        <Button
          title={t('auth.registration.enterEmail.submitFormButtonText')}
          onClick={onSubmitFormButtonClick}
        />
      </ContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default EnterEmailForRegistrationPage;
