import React, {useCallback} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {
  selectInfoModalData,
  selectIsInfoModalVisible,
} from '../../../store/appGlobalModals/selectors';
import {AppGlobalModalsActions} from '../../../store/common/reducerActions';
import CustomButton, {BUTTON_HEIGHT} from '../../uiKit/Button';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../uiKit/TextBlock';
import Modal from '../common';

const InfoModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 60px 40px 30px;
  border-radius: 10px;

  min-width: 200px;
  max-width: 600px;
`;

const InfoModalHeadingText = styled(TextBlock)`
  text-align: center;
  font-size: 26px;
  color: ${(props) => props.theme.colors.realPrimary};
  line-height: 32px;
`;

const InfoModalLeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.grey20};
  text-align: center;
`;

const InfoModalActionButton = styled(CustomButton)`
  margin-top: 30px;
`;

const GlobalInfoModal = (): JSX.Element => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isVisible = useSelector(selectIsInfoModalVisible);
  const data = useSelector(selectInfoModalData);

  const closeModal = useCallback(() => {
    dispatch(AppGlobalModalsActions.closeModal());
    if (data.acceptButtonAction) {
      dispatch(data.acceptButtonAction);
    }
  }, [data, dispatch]);

  if (data === undefined) {
    return null;
  }

  const {localizedHeading, localizedMessage} = data;

  return (
    <Modal isModalVisible={isVisible} onClick={closeModal}>
      <InfoModalContentContainer>
        <InfoModalHeadingText type={TEXT_BLOCK_TYPE.H2}>{localizedHeading}</InfoModalHeadingText>
        {localizedMessage && (
          <InfoModalLeadText type={TEXT_BLOCK_TYPE.P7}>{localizedMessage}</InfoModalLeadText>
        )}
        <InfoModalActionButton
          title={t('globalModals.errorModalButtonLabel')}
          onClick={closeModal}
          buttonHeight={BUTTON_HEIGHT.THIN}
        />
      </InfoModalContentContainer>
    </Modal>
  );
};

export default GlobalInfoModal;
