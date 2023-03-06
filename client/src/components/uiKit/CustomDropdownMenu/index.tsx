import React from 'react';

import {Dropdown} from 'react-bootstrap';
import styled from 'styled-components';

import {ReactComponent as Toggle} from '../../../resources/icons/Popup_menu_toggler.svg';

export enum DROPDOWN_DROP_ORIENTATION {
  VERTICAL = 'down',
  HORIZONTAL = 'end',
}

const StyledDropdown = styled(Dropdown)`
  .custom-dropdown-toggle,
  .custom-dropdown-toggle:hover,
  .custom-dropdown-toggle:focus {
    border: none !important;
    outline: none !important;
    padding: 0 !important;
    box-shadow: none !important;
    background-color: transparent !important;
  }

  .toggle-icon {
    transform: rotate(${({drop}) => (drop === DROPDOWN_DROP_ORIENTATION.VERTICAL ? 0 : 90)}deg);
  }

  .dropdown-toggle::after {
    display: none;
  }

  .custom-dropdown-menu {
    padding: 10px 10px 10px 16px;
    border: none !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
`;

interface CustomDropdownMenuProps {
  children?: React.ReactNode;
  dropDirection?: DROPDOWN_DROP_ORIENTATION;
  className?: string;
}

const CustomDropdownMenu = ({
  dropDirection = DROPDOWN_DROP_ORIENTATION.VERTICAL,
  children,
  className,
}: CustomDropdownMenuProps): JSX.Element => {
  return (
    <StyledDropdown onClick={(e) => e.stopPropagation()} className={className} drop={dropDirection}>
      <Dropdown.Toggle className={'custom-dropdown-toggle'}>
        <Toggle className={'toggle-icon'} />
      </Dropdown.Toggle>

      <Dropdown.Menu className={'custom-dropdown-menu'}>{children}</Dropdown.Menu>
    </StyledDropdown>
  );
};

export default CustomDropdownMenu;
