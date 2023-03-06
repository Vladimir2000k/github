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
import {selectRegistrationPagesCurrentEvent} from '../../../store/auth/registration/selectors';
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

const LeadText = styled(TextBlock)`
  width: 488px;
  margin-top: 20px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.realPrimary};
`;

const ResentText = styled.div`
  margin-top: 30px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.grey20};
`;

const ResendMailTextContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
`;

const ResendMailLinkLikeButton = styled.span`
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

const ResendEmailForRegistrationPage = (): JSX.Element => {
  const [isMailResent, setIsMailResent] = useState(false);

  const event = useSelector(selectRegistrationPagesCurrentEvent);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  const onResendLinkLikeButtonClick = useCallback(() => {
    dispatch(RegistrationActions.clearErrorsData());
    dispatch(RegistrationSagaActions.resendEmail());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case REGISTRATION_EVENTS.MAIL_RESENT:
          dispatch(RegistrationActions.handleCurrentEvent());
          setIsMailResent(true);
          break;
        case REGISTRATION_EVENTS.NAVIGATE_TO_ENTER_EMAIL:
          dispatch(RegistrationActions.handleCurrentEvent());
          history.push('/auth/registration/enter-email');
          break;
        case REGISTRATION_EVENTS.ERROR:
          dispatch(RegistrationActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history]);

  return (
    <LandingPagesContainer>
      <Header />
      <ContentContainer>
        <Image src={Sending_mail_image} />
        <HeadingText>{t('auth.registration.resendMail.headingText')}</HeadingText>
        <LeadText type={TEXT_BLOCK_TYPE.P6}>{t('auth.registration.resendMail.leadText')}</LeadText>
        {isMailResent ? (
          <ResentText>{t('auth.registration.resendMail.sent')}</ResentText>
        ) : (
          <ResendMailTextContainer>
            {t('auth.registration.resendMail.letterNotComing')}
            <br />
            <ResendMailLinkLikeButton onClick={onResendLinkLikeButtonClick}>
              {t('auth.registration.resendMail.weCanResendItAgain')}
            </ResendMailLinkLikeButton>
          </ResendMailTextContainer>
        )}
        <CustomButton
          title={t('auth.registration.resendMail.goToFeedbackButtonText')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          onClick={() => history.push('/contact-us')}
        />
      </ContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default ResendEmailForRegistrationPage;
