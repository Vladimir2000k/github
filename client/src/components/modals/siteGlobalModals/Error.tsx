import React, {useCallback} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {
  selectErrorModalData,
  selectIsErrorModalVisible,
} from '../../../store/appGlobalModals/selectors';
import {AppGlobalModalsActions} from '../../../store/common/reducerActions';
import CustomButton, {BUTTON_HEIGHT} from '../../uiKit/Button';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../uiKit/TextBlock';
import Modal from '../common';

const ErrorModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 60px 40px 30px;
  border-radius: 10px;

  min-width: 200px;
  max-width: 600px;
`;

const ErrorModalHeadingText = styled(TextBlock)`
  text-align: center;
`;

const ErrorModalLeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.grey20};
  text-align: center;
`;

const ErrorModalActionButton = styled(CustomButton)`
  margin-top: 30px;
`;

const GlobalErrorModal = (): JSX.Element => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isVisible = useSelector(selectIsErrorModalVisible);
  const data = useSelector(selectErrorModalData);

  const closeModal = useCallback(() => {
    dispatch(AppGlobalModalsActions.closeModal());
  }, [dispatch]);

  if (data === undefined) {
    return null;
  }

  const {localizedHeading, localizedMessage} = data;

  return (
    <Modal isModalVisible={isVisible} onClick={closeModal}>
      <ErrorModalContentContainer>
        <ErrorModalHeadingText type={TEXT_BLOCK_TYPE.H2}>{localizedHeading}</ErrorModalHeadingText>
        <ErrorModalLeadText type={TEXT_BLOCK_TYPE.P7}>{localizedMessage}</ErrorModalLeadText>
        <ErrorModalActionButton
          title={t('globalModals.errorModalButtonLabel')}
          onClick={closeModal}
          buttonHeight={BUTTON_HEIGHT.THIN}
        />
      </ErrorModalContentContainer>
    </Modal>
  );
};

export default GlobalErrorModal;
