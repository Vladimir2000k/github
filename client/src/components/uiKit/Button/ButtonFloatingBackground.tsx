import React from 'react';

import styled from 'styled-components';

import {BUTTON_HEIGHT, CUSTOM_BUTTON_ICON_ALIGN} from './index';

interface StyledButtonProps {
  blobsCount: number;
  bgColor: string;
  blobsColor: string;
  textColorNormal: string;
  textColorHover: string;
  buttonHeight: BUTTON_HEIGHT;
}

export const StyledButton = styled.button<StyledButtonProps>(
  ({buttonHeight, blobsCount, bgColor, blobsColor, textColorNormal, textColorHover}) => {
    let buttonHeightValue;
    let fontSize;
    let initialButtonPadding;
    let lineHeight;

    const percentOffset = 100 / blobsCount;
    const transDelayOffset = 0.3 / blobsCount;

    switch (buttonHeight) {
      case BUTTON_HEIGHT.THIN:
        buttonHeightValue = 40;
        fontSize = 14;
        lineHeight = 18;
        initialButtonPadding = '11px 22px';
        break;
      case BUTTON_HEIGHT.NORMAL:
        buttonHeightValue = 60;
        fontSize = 20;
        lineHeight = 28;
        initialButtonPadding = '16px';
        break;
    }

    const blobsSeparateConfig = [...Array(blobsCount).keys()]
      .map((i) => {
        return `
        .blob:nth-child(${i + 1}) {
        left: ${percentOffset * i}%;
        transition-delay: ${transDelayOffset * i}s;
      }
      `;
      })
      .join('\n');

    return `
      height: ${buttonHeightValue}px;
    
      user-select: none;
      z-index: 1;
      position: relative;
      padding: ${initialButtonPadding};
      text-align: center;
      color: ${textColorNormal};
      font-size: ${fontSize}px;
      font-weight: 500;
      line-height: ${lineHeight}px;
      background-color: transparent;
      outline: none;
      border: none;
      transition: color 0.5s;
      cursor: pointer;
      border-radius: 10px;
      letter-spacing: ${buttonHeight === BUTTON_HEIGHT.THIN ? '-0.531474px' : 'unset'};
      
      align-items: center;
      justify-content: center;
      display: flex;
     
      &:hover {
        color: ${textColorHover};
      }
    
      svg {
        display: none;
      }
      
      svg.button__icon {
        display: flex;
      }
    
      .inner {
        z-index: -1;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: ${bgColor};
      }
    
      .blobs {
        position: relative;
        display: block;
        height: 100%;
        filter: url('#goo');
      }
    
      .blob {
        position: absolute;
        top: 0;
        width: ${percentOffset}%;
        height: 100%;
        background: ${blobsColor};
        border-radius: 100%;
        transform: translate3d(0, 150%, 0) scale(1.7);
        transition: transform 0.45s;
    
        @supports (filter: url('#goo')) {
          transform: translate3d(0, 150%, 0) scale(1.4);
        }
      }
    
      ${blobsSeparateConfig}
    
      &:hover .blob {
        transform: translateZ(0) scale(1.7);
    
        @supports (filter: url('#goo')) {
          transform: translateZ(0) scale(1.4);
        }
      }
    `;
  },
);

interface IconContainerProps {
  size: number;
  align: CUSTOM_BUTTON_ICON_ALIGN;
}

const IconContainer = styled.div<IconContainerProps>(({size, align}) => {
  return `
    height: ${size}px;
    display: flex;
    align-items: center;
    ${align === CUSTOM_BUTTON_ICON_ALIGN.RIGHT ? 'margin-left:' : 'margin-right:'} 12px;
  `;
});

const ButtonIcon = styled.img`
  display: flex;
`;

interface ButtonFloatingBackgroundProps {
  className?: string;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  blobsCount?: number;
  bgColor?: string;
  blobsColor?: string;
  textColorNormal?: string;
  textColorHover?: string;
  icon?: any | null;
  buttonHeight?: BUTTON_HEIGHT;
  iconAlign?: CUSTOM_BUTTON_ICON_ALIGN;
}

const ButtonFloatingBackground = ({
  className,
  title,
  disabled = false,
  onClick,
  blobsCount = 4,
  bgColor = '#ebe5ff',
  blobsColor = '#353bce',
  textColorNormal = '#353bce',
  textColorHover = '#fff',
  icon = null,
  buttonHeight = BUTTON_HEIGHT.THIN,
  iconAlign = CUSTOM_BUTTON_ICON_ALIGN.RIGHT,
}: ButtonFloatingBackgroundProps): JSX.Element => {
  let iconContainerSize;

  switch (buttonHeight) {
    case BUTTON_HEIGHT.THIN:
      iconContainerSize = 25;
      break;
    case BUTTON_HEIGHT.NORMAL:
      iconContainerSize = 45;
      break;
  }

  return (
    <StyledButton
      className={className}
      disabled={disabled}
      onClick={onClick}
      blobsCount={blobsCount}
      bgColor={bgColor}
      blobsColor={blobsColor}
      textColorNormal={textColorNormal}
      textColorHover={textColorHover}
      buttonHeight={buttonHeight}>
      {icon !== null && iconAlign === CUSTOM_BUTTON_ICON_ALIGN.LEFT && (
        <IconContainer
          className="button__icon-container"
          size={iconContainerSize}
          align={iconAlign}>
          <ButtonIcon className={'button__icon'} as={icon} />
        </IconContainer>
      )}

      {title}
      <span className="inner">
        <span className="blobs">
          {[...Array(blobsCount).keys()].map((i) => (
            <span key={i} className="blob" />
          ))}
        </span>
      </span>

      {icon !== null && iconAlign === CUSTOM_BUTTON_ICON_ALIGN.RIGHT && (
        <IconContainer
          className="button__icon-container"
          size={iconContainerSize}
          align={iconAlign}>
          <ButtonIcon className={'button__icon'} as={icon} />
        </IconContainer>
      )}

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </StyledButton>
  );
};

export default ButtonFloatingBackground;
