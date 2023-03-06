import React from 'react';

import {Dropdown} from 'react-bootstrap';
import styled from 'styled-components';

import TextBlock, {TEXT_BLOCK_TYPE} from '../../../TextBlock';

export enum DROPDOWN_BUTTON_TYPE {
  COMMON = 'COMMON',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

// @ts-ignore
const StyledDropdownButton = styled(Dropdown.Item)<{
  buttonType: DROPDOWN_BUTTON_TYPE;
}>(({buttonType, theme}) => {
  let color;

  switch (buttonType) {
    case DROPDOWN_BUTTON_TYPE.COMMON:
      color = '#25213B';
      break;
    case DROPDOWN_BUTTON_TYPE.SUCCESS:
      color = theme.colors.success;
      break;
    case DROPDOWN_BUTTON_TYPE.WARNING:
      color = theme.colors.warning;
      break;
  }

  return `
      height: 27px;
      border-radius: 4px;
      padding: 5px !important;
    
      &:hover,
      :focus {
        background: #f2f0f9;
      }
    
      .title {
        line-height: 17px;
        color: ${color};
      }
    `;
});

interface CustomDropdownCommonButtonProps {
  title: string;
  onClick?: (e) => void;
  buttonType?: DROPDOWN_BUTTON_TYPE;
}

const DropdownButton = ({
  title,
  onClick,
  buttonType = DROPDOWN_BUTTON_TYPE.COMMON,
}: CustomDropdownCommonButtonProps): JSX.Element => {
  return (
    // @ts-ignore
    <StyledDropdownButton buttonType={buttonType} onClick={(e) => onClick(e)}>
      <TextBlock className={'title'} type={TEXT_BLOCK_TYPE.P7}>
        {title}
      </TextBlock>
    </StyledDropdownButton>
  );
};

export default DropdownButton;
