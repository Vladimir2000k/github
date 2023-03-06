import React, {useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../../components/Footer';
import Header from '../../../components/LandingHeader';
import LandingPagesContainer from '../../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../../components/LandingPagesContentContainer';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../../components/uiKit/TextBlock';
import {selectRegistrationPagesCurrentEvent} from '../../../store/auth/registration/selectors';
import {REGISTRATION_EVENTS} from '../../../store/auth/registration/types';
import {RegistrationActions} from '../../../store/common/reducerActions';
import {RegistrationSagaActions} from '../../../store/common/sagaActions';

const ContentContainer = styled(LandingPagesContentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(TextBlock)`
  margin-bottom: 30px;
`;

const ConfirmEmailForRegistrationPage = (): JSX.Element => {
  const event = useSelector(selectRegistrationPagesCurrentEvent);

  const {emailConfirmationKey} = useParams<{emailConfirmationKey: string}>();

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case REGISTRATION_EVENTS.NAVIGATE_TO_HOME:
          dispatch(RegistrationActions.handleCurrentEvent());
          history.push('/workspaces');
          break;
        case REGISTRATION_EVENTS.ERROR:
          dispatch(RegistrationActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history]);

  useEffect(() => {
    dispatch(RegistrationSagaActions.confirmEmail(emailConfirmationKey));
  }, [dispatch, emailConfirmationKey]);

  return (
    <LandingPagesContainer>
      <Header />
      <ContentContainer>
        <Text type={TEXT_BLOCK_TYPE.H4}>{t('auth.registration.confirmEmail.sendingMail')}</Text>
      </ContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default ConfirmEmailForRegistrationPage;
