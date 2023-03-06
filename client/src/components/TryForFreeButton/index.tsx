import React from 'react';

import styled from 'styled-components';

const TryForFreeButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTryForFreeButton = styled.button<{simplified?: boolean}>((props) => {
  const {simplified, theme} = props;
  const fullVariantStyles = `
    &::after {
      content: '';
      width: 30px; height: 30px;
      border-radius: 100%;
      border: 6px solid ${theme.colors.secondary};
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: ring 4s infinite;
    }
    
    &:hover::after, button:focus::after {
      animation: none;
      display: none;
    }
    
    @keyframes ring {
      0% {
        width: 30px;
        height: 30px;
        opacity: 1;
      }
      50% {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
      60%, 100% {
        opacity: 0;
      }
    }
`;

  return `
    width: 300px;
    height: 60px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    font-weight: 700;
    color: ${theme.colors.white};
    background: linear-gradient(90deg, rgba(53, 59, 206, 1) 0%, rgba(15, 19, 135, 1) 100%);
    border: none;
    border-radius: 1000px;
    box-shadow: 12px 12px 24px rgba(53, 59, 206, .2);
    transition: all 0.3s ease-in-out 0s;
    cursor: pointer;
    user-select: none;
    outline: none;
    position: relative;
    padding: 10px;
    
    &:hover, &:focus {
      color: ${theme.colors.secondary};
      transform: translateY(-6px);
    }
    
     &::before {
      content: '';
      border-radius: 1000px;
      min-width: calc(300px + 12px);
      min-height: calc(60px + 12px);
      border: 3px solid ${theme.colors.secondary};
      box-shadow: 0 0 60px rgba(53, 59, 206, .3);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: all .3s ease-in-out 0s;
    }
    
    &:hover::before, :focus::before {
        opacity: 1;
    }
    
    ${!simplified && fullVariantStyles}
  `;
});

interface TryForFreeButtonProps {
  simplified?: boolean;
  title: string;
  onClick: () => void;
}

const TryForFreeButton = ({simplified, title, onClick}: TryForFreeButtonProps): JSX.Element => {
  return (
    <TryForFreeButtonWrapper>
      <StyledTryForFreeButton simplified={simplified} onClick={onClick}>
        {title}
      </StyledTryForFreeButton>
    </TryForFreeButtonWrapper>
  );
};

TryForFreeButton.defaultProps = {
  simplified: false,
};

export default TryForFreeButton;
