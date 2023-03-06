import React from 'react';

import styled from 'styled-components';

import CheckboxCheckmark from '../../../resources/icons/CheckboxCheckmark.svg';

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  .label {
    font-weight: bold;
    font-size: 12px;
    line-height: 26px;
    margin-left: 10px;
    color: #3a3e87;
  }

  .checkbox {
    cursor: pointer;
    appearance: none;
    position: relative;
    height: 20px;
    width: 20px;
    border: 1.5px solid #353bce;
    box-sizing: border-box;
    border-radius: 3px;
  }

  .checkbox:checked {
    background-color: #353bce;
  }

  .checkbox:checked:after {
    content: '';
    position: absolute;
    width: 12px;
    height: 10px;
    background-repeat: no-repeat;
    background-position: center;
    left: 3px;
    top: 3px;
    background-image: url(${CheckboxCheckmark});
  }
`;

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (e) => void;
}

const CheckboxInput = ({label, checked, onChange}: CheckboxInputProps): JSX.Element => {
  return (
    <CheckboxWrapper>
      <input className={'checkbox'} checked={checked} onChange={onChange} type={'checkbox'} />
      <div className={'label'}>{label}</div>
    </CheckboxWrapper>
  );
};

export default CheckboxInput;
