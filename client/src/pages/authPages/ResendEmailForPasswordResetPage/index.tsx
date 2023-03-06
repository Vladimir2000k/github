import React, {useCallback, useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../../components/Footer';
import Header from '../../../components/LandingHeader';
import LandingPagesContainer from '../../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../../components/LandingPagesContentContainer';
import OptimizedPNGImage from '../../../components/OptimizedPNGImage';
import CustomButton, {BUTTON_HEIGHT} from '../../../components/uiKit/Button';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../../components/uiKit/TextBlock';
import Sending_mail_image from '../../../resources/images/Sending_mail_image.png';
import {selectPasswordResetPageCurrentEvent} from '../../../store/auth/passwordReset/selectors';
import {PASSWORD_RESET_EVENTS} from '../../../store/auth/passwordReset/types';
import {PasswordResetActions} from '../../../store/common/reducerActions';
import {PasswordResetSagaActions} from '../../../store/common/sagaActions';

const ResendEmailPageContentContainer = styled(LandingPagesContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 75px;
`;

const ResendEmailPageImage = styled(OptimizedPNGImage)`
  width: 309px;
  height: 225px;
  margin-top: 33px;
`;

const ResendEmailPageHeadingText = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey20};
`;

const ResendEmailPageLeadText = styled(TextBlock)`
  width: 488px;
  margin-top: 20px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.realPrimary};
`;

const ResendEmailPageResentText = styled.div`
  margin-top: 30px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey20};
`;

const ResendEmailPageResendMailTextContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
`;

const ResendEmailPageResendMailLinkLikeButton = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
  user-select: none;
  text-decoration: underline;
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ResendEmailForPasswordResetPage = (): JSX.Element => {
  const [isMailResent, setIsMailResent] = useState(false);

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
        case PASSWORD_RESET_EVENTS.MAIL_RESENT:
          dispatch(PasswordResetActions.handleCurrentEvent());
          setIsMailResent(true);
          break;
        case PASSWORD_RESET_EVENTS.NAVIGATE_TO_ENTER_EMAIL:
          dispatch(PasswordResetActions.handleCurrentEvent());
          history.push('/auth/password-reset/enter-email');
          break;
        case PASSWORD_RESET_EVENTS.ERROR:
          dispatch(PasswordResetActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history]);

  const onResendLinkLikeButtonClick = useCallback(() => {
    dispatch(PasswordResetSagaActions.resendEmail());
  }, [dispatch]);

  return (
    <LandingPagesContainer>
      <Header />
      <ResendEmailPageContentContainer>
        <ResendEmailPageImage src={Sending_mail_image} />
        <ResendEmailPageHeadingText>
          {t('auth.passwordReset.resendMail.headingText')}
        </ResendEmailPageHeadingText>
        <ResendEmailPageLeadText type={TEXT_BLOCK_TYPE.P6}>
          {t('auth.passwordReset.resendMail.leadText')}
        </ResendEmailPageLeadText>
        {isMailResent ? (
          <ResendEmailPageResentText>
            {t('auth.passwordReset.resendMail.sent')}
          </ResendEmailPageResentText>
        ) : (
          <ResendEmailPageResendMailTextContainer>
            {t('auth.passwordReset.resendMail.letterNotComing')}
            <br />
            <ResendEmailPageResendMailLinkLikeButton onClick={onResendLinkLikeButtonClick}>
              {t('auth.passwordReset.resendMail.weCanResendItAgain')}
            </ResendEmailPageResendMailLinkLikeButton>
          </ResendEmailPageResendMailTextContainer>
        )}
        <CustomButton
          title={t('auth.passwordReset.resendMail.goToFeedbackButtonText')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          onClick={() => history.push('/contact-us')}
        />
      </ResendEmailPageContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default ResendEmailForPasswordResetPage;
