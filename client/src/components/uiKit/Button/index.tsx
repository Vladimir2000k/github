import React from 'react';

import styled from 'styled-components';

import Loader from '../Loader';

export enum BUTTON_HEIGHT {
  THIN,
  NORMAL,
}

export enum BUTTON_FILLING_TYPE {
  CLEAR,
  OUTLINE,
  FILLED,
}

interface StyledButtonProps {
  buttonHeight?: BUTTON_HEIGHT;
  fillingType?: BUTTON_FILLING_TYPE;
  loading?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>(
  ({disabled, theme, buttonHeight, loading, fillingType}) => {
    let buttonHeightValue;
    let initialButtonPadding;
    let fontSize;

    let fontWeight;
    let fontWeightFocus = 400;

    let lineHeight;

    let color;
    let colorHover;

    let backgroundColor;
    let backgroundHoverColor;
    let backgroundFocusColor;

    let boxShadow = 'none';
    let boxShadowHover = 'none';
    let boxShadowFocus = 'none';

    let filterHover;
    let filterFocus;

    const textShadowHover = 'unset';
    let textShadowFocus = 'unset';

    switch (buttonHeight) {
      case BUTTON_HEIGHT.THIN:
        buttonHeightValue = 40;
        fontSize = 14;
        fontWeight = 600;
        fontWeightFocus = 600;
        lineHeight = 18;
        initialButtonPadding = loading ? '14px 34px' : '11px 22px';
        break;
      case BUTTON_HEIGHT.NORMAL:
        buttonHeightValue = 60;
        fontSize = 20;
        fontWeight = 500;
        lineHeight = 28;
        initialButtonPadding = loading ? '20px 62px' : '16px';
        break;
    }

    switch (fillingType) {
      case BUTTON_FILLING_TYPE.FILLED:
        fontWeightFocus = 500;

        color = theme.colors.white;
        colorHover = theme.colors.white;

        backgroundColor = disabled ? theme.colors.btnPrimaryDisabled : theme.colors.btnPrimary;
        backgroundHoverColor = disabled
          ? theme.colors.btnPrimaryDisabled
          : theme.colors.btnPrimaryHover;
        backgroundFocusColor = disabled
          ? theme.colors.btnPrimaryDisabled
          : theme.colors.btnPrimaryFocus;

        boxShadowFocus = 'inset 0 0 0 3px #9bcffd';
        break;
      case BUTTON_FILLING_TYPE.CLEAR:
        fontWeightFocus = 500;

        color = disabled ? theme.colors.btnPrimaryDisabled : theme.colors.btnPrimary;
        colorHover = disabled ? theme.colors.btnPrimaryDisabled : theme.colors.btnPrimary;

        backgroundColor = 'rgba(0, 0, 0, 0)';
        backgroundHoverColor = 'rgba(0, 0, 0, 0)';
        backgroundFocusColor = theme.colors.btnPrimaryFocus;
        break;
      case BUTTON_FILLING_TYPE.OUTLINE:
        fontWeightFocus = 500;

        color = disabled ? theme.colors.btnPrimaryDisabled : theme.colors.btnPrimary;
        colorHover = disabled ? theme.colors.btnPrimaryDisabled : theme.colors.btnSecondary;

        backgroundColor = 'rgba(0, 0, 0, 0)';
        backgroundHoverColor = 'rgba(0, 0, 0, 0)';
        backgroundFocusColor = 'rgba(0, 0, 0, 0)';

        boxShadow = disabled
          ? `inset 0 0 0 1px ${theme.colors.btnPrimaryDisabled}`
          : `inset 0 0 0 1px ${theme.colors.btnPrimary}`;
        boxShadowHover = disabled
          ? `inset 0 0 0 1px ${theme.colors.btnPrimaryDisabled}`
          : `inset 0 0 0 1px ${theme.colors.btnSecondary}`;
        boxShadowFocus = disabled
          ? `inset 0 0 0 1px ${theme.colors.btnPrimaryDisabled}`
          : `inset 0 0 0 1px ${theme.colors.btnPrimary}`;

        textShadowFocus = `0.5px 0 0 ${color}`;

        filterHover = disabled
          ? 'drop-shadow(0px 0px 1px rgba(117, 131, 142, 0.04)) drop-shadow(0px 2px 4px rgba(52, 60, 68, 0.16))'
          : 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.12)) drop-shadow(0px 12px 24px rgba(29, 78, 216, 0.32))';
        filterFocus =
          'drop-shadow(0px 0px 1px rgba(117, 131, 142, 0.04)) drop-shadow(0px 2px 4px rgba(52, 60, 68, 0.16))';
        break;
    }

    return `
      height: ${buttonHeightValue}px;
      padding: ${initialButtonPadding};
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      line-height: ${lineHeight}px;
      user-select: none;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${backgroundColor};
      color: ${color};
      outline: none;
      border-radius: 10px;
      cursor: ${disabled ? 'auto' : 'pointer'};
      
      box-shadow: ${boxShadow};
      
      &:hover {
        text-shadow: ${textShadowHover};
        background-color: ${backgroundHoverColor};
        box-shadow: ${boxShadowHover};
        color: ${colorHover};
        filter: ${filterHover};
      }
      
      &:focus {
        text-shadow: ${textShadowFocus};
        font-weight: ${fontWeightFocus};
        background-color: ${backgroundFocusColor};
        box-shadow: ${boxShadowFocus};
        filter: ${filterFocus};
      }
    `;
  },
);

export enum CUSTOM_BUTTON_ICON_ALIGN {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface IconContainerProps {
  size: number;
  align: CUSTOM_BUTTON_ICON_ALIGN;
}

const IconContainer = styled.div<IconContainerProps>(({size, align}) => {
  return `
    height: ${size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${align === CUSTOM_BUTTON_ICON_ALIGN.RIGHT ? 'margin-left:' : 'margin-right:'} 12px;
  `;
});

const ButtonIcon = styled.img``;

interface CustomButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
  buttonHeight?: BUTTON_HEIGHT;
  fillingType?: BUTTON_FILLING_TYPE;
  disabled?: boolean;
  loading?: boolean;
  icon?: any | null;
  iconAlign?: CUSTOM_BUTTON_ICON_ALIGN;
  fullyRounded?: boolean;
}

/**
 * @param title
 * @param buttonHeight
 * @param disabled
 * @param loading
 * @param className
 * @param icon
 * @param iconAlign
 * @param onClick
 * @constructor
 *
 * classNames: button__loader, button__icon-container, button__icon
 *
 * Use classes to redefine styles of components witch CustomButton contains.
 * Use IconContainer and button__icon-container className to calculate margins between a button text and an icon
 */

const CustomButton = ({
  title,
  buttonHeight = BUTTON_HEIGHT.NORMAL,
  fillingType = BUTTON_FILLING_TYPE.FILLED,
  disabled = false,
  loading = false,
  className,
  icon = null,
  iconAlign = CUSTOM_BUTTON_ICON_ALIGN.RIGHT,
  onClick,
}: CustomButtonProps): JSX.Element => {
  let loaderSize;
  let loaderBorderWidth;
  let iconContainerSize;

  switch (buttonHeight) {
    case BUTTON_HEIGHT.THIN:
      loaderSize = 12;
      loaderBorderWidth = 2;
      iconContainerSize = 25;
      break;
    case BUTTON_HEIGHT.NORMAL:
      loaderSize = 21;
      loaderBorderWidth = 4;
      iconContainerSize = 45;
      break;
  }

  return (
    <StyledButton
      className={className}
      disabled={disabled}
      onClick={onClick}
      buttonHeight={buttonHeight}
      fillingType={fillingType}>
      {icon !== null && iconAlign === CUSTOM_BUTTON_ICON_ALIGN.LEFT && (
        <IconContainer
          className="button__icon-container"
          size={iconContainerSize}
          align={iconAlign}>
          <ButtonIcon className={'button__icon'} as={icon} />
        </IconContainer>
      )}
      {loading ? (
        <Loader className="button__loader" size={loaderSize} borderWidth={loaderBorderWidth} />
      ) : (
        title
      )}
      {icon !== null && iconAlign === CUSTOM_BUTTON_ICON_ALIGN.RIGHT && (
        <IconContainer
          className="button__icon-container"
          size={iconContainerSize}
          align={iconAlign}>
          <ButtonIcon className={'button__icon'} as={icon} />
        </IconContainer>
      )}
    </StyledButton>
  );
};

export default CustomButton;
