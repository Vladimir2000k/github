import React, {useRef, useState} from 'react';

import styled from 'styled-components';

import {ReactComponent as DropdownArrow} from '../../../resources/icons/Chevron.svg';
import {GENERATION_LANG_OPTIONS} from '../../../store/appGlobal/types';
import useOutsideClickHandler from '../../../utils/useOutsideClickHandler';
import ErrorMessage from '../ErrorMessage';
import TextBlock, {TEXT_BLOCK_TYPE} from '../TextBlock';

const StyledCustomDropdown = styled.div<{isDropdownOpened: boolean; isError: boolean}>`
  position: relative;
  user-select: none;
  height: fit-content;

  font-family: 'Inter', 'Mulish', sans-serif;

  .dropdown-selected-option-wrapper {
    padding: 8px 8px 8px 23px;
    display: flex;
    justify-content: space-between;
    gap: 25px;
    border-radius: 6px;
    border: 1px solid #dde2e4;
    background: ${({theme, isError}) =>
      isError ? theme.colors.inputErrorBorder : theme.colors.white};
    cursor: pointer;

    &__selected-item-label {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__dropdown-chevron {
      transition: transform 0.2s linear;
      transform: rotate(${({isDropdownOpened}) => (isDropdownOpened ? -180 : 0)}deg);
    }
  }

  .dropdown-options-wrapper {
    display: ${({isDropdownOpened}) => (isDropdownOpened ? 'block' : 'none')};
    transition: height 0.2s linear;
    box-sizing: border-box;
    position: absolute;
    z-index: 5000;
    top: 45px;
    background: ${({theme}) => theme.colors.white};
    border: 1px solid #c6c2de;
    border-radius: 6px;
    padding: 6px 12px;
    width: 100%;
    max-height: 147px;
    overflow: auto;

    &__option {
      border-radius: 4px;
      cursor: pointer;
      line-height: 18px;
      padding: 5px 11px 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__option:hover {
      background: #f2f0f9;
    }
  }
`;

export interface DropdownOption {
  value: string | number;
  label: string;
}

interface CustomDropdownProps {
  className?: string;
  options: Array<DropdownOption>;
  selectedOption?: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  errors?: Array<string>;
}

const CustomDropdown = ({
  className,
  selectedOption,
  options,
  onSelect,
  placeholder = '',
  errors,
}: CustomDropdownProps): JSX.Element => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const dropdownRef = useRef(null);
  useOutsideClickHandler(dropdownRef, () => setIsDropdownOpened(false));

  const isError = errors?.length > 0;

  return (
    <StyledCustomDropdown
      className={className}
      isDropdownOpened={isDropdownOpened}
      isError={isError}
      ref={dropdownRef}>
      <div
        className={'dropdown-selected-option-wrapper'}
        onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
        <TextBlock
          className={'dropdown-selected-option-wrapper__selected-item-label'}
          type={TEXT_BLOCK_TYPE.P7}>
          {selectedOption?.label || placeholder}
        </TextBlock>
        <DropdownArrow className={'dropdown-selected-option-wrapper__dropdown-chevron'} />
      </div>
      <div className={'dropdown-options-wrapper'}>
        {options.map((option) => (
          <TextBlock
            onClick={() => {
              setIsDropdownOpened(!isDropdownOpened);
              onSelect(option);
            }}
            type={TEXT_BLOCK_TYPE.P7}
            className={'dropdown-options-wrapper__option'}>
            {option.label}
          </TextBlock>
        ))}
      </div>
      {isError && <ErrorMessage className="input-error" errors={errors} />}
    </StyledCustomDropdown>
  );
};

export default CustomDropdown;
