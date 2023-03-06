import React from 'react';

import ModalContentWrapper from './ModalContentWrapper';
import ModalOverlay from './ModalOverlay';

interface ModalProps {
  children: React.ReactNode;
  isModalVisible: boolean;
  onClick: () => void;
}

const Modal = ({children, isModalVisible, onClick}: ModalProps): JSX.Element => {
  return (
    <ModalOverlay className="modal-overlay" isModalVisible={isModalVisible} onClick={onClick}>
      <ModalContentWrapper className="modal-content-wrapper" onCrossButtonClick={onClick}>
        {children}
      </ModalContentWrapper>
    </ModalOverlay>
  );
};

export default Modal;
