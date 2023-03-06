import React from 'react';

import styled from 'styled-components';

import {ReactComponent as Cross} from '../../../../resources/icons/Cross.svg';
import ModalBg from '../../../../resources/images/Modal_bg.png';

const StyledModalContentWrapper = styled.div`
  position: relative;

  background-image: url(${ModalBg});
  image-rendering: -webkit-optimize-contrast;
  background-color: ${(props) => props.theme.colors.white};
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: right;
  border-radius: 10px;
`;

const ModalCloseButton = styled.img`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

interface ModalContentWrapperProps {
  className: string;
  children: React.ReactNode;
  onCrossButtonClick: () => void;
}

const ModalContentWrapper = ({
  className,
  children,
  onCrossButtonClick,
}: ModalContentWrapperProps): JSX.Element => {
  return (
    <StyledModalContentWrapper className={className} onClick={(event) => event.stopPropagation()}>
      <ModalCloseButton
        className={className + '__cross-button'}
        as={Cross}
        onClick={onCrossButtonClick}
      />
      {children}
    </StyledModalContentWrapper>
  );
};

export default ModalContentWrapper;
