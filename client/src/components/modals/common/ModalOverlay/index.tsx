import React from 'react';

import styled from 'styled-components';

const StyledModalOverlay = styled.div<{isModalVisible?: boolean}>(({isModalVisible}) => {
  return `
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
  display: ${isModalVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(63, 68, 208, 0.25); /* #3F44D0; opacity = 25% */
`;
});

interface ModalOverlayProps {
  className: string;
  children: React.ReactNode;
  isModalVisible: boolean;
  onClick: () => void;
}

const ModalOverlay = ({
  className,
  children,
  isModalVisible = false,
  onClick,
}: ModalOverlayProps): JSX.Element => {
  return (
    <StyledModalOverlay className={className} isModalVisible={isModalVisible} onClick={onClick}>
      {children}
    </StyledModalOverlay>
  );
};

export default ModalOverlay;
