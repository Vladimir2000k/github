import React, {useState} from 'react';

import styled from 'styled-components';

import ErrorMessage from '../ErrorMessage';

const StyledCustomInputWrapper = styled.div`
  position: relative;
  width: 100%;

  .symbols-count {
    margin-top: 10px;
    font-size: 10px;
    line-height: 24px;
    color: #202020;
    text-align: right;
  }
`;

const PlaceholderIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12px;
  left: 27px;
  height: 25px;
  width: 25px;
`;

const PlaceholderIcon = styled.img<{shouldBeDisplayed: boolean}>(({shouldBeDisplayed, theme}) => {
  return `
    display: ${shouldBeDisplayed ? 'inline' : 'none'};
    color: ${theme.colors.inputIcon};
  `;
});

interface StyledCustomTextareaProps {
  isError: boolean;
  isDisabled: boolean;
  isPlaceholderIcon: boolean;
}

const StyledCustomTextarea = styled.textarea<StyledCustomTextareaProps>((props) => {
  const {
    isError,
    isDisabled,
    isPlaceholderIcon,
    theme: {colors},
  } = props;

  let borderColor = colors.inputCommonBorder;

  if (isError) {
    borderColor = colors.inputErrorBorder;
  } else if (isDisabled) {
    borderColor = colors.inputDisabledBorder;
  }

  return `
    width: 100%;
  
    font-family: Mulish, san-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    
    background: ${isDisabled ? colors.inputDisabledBackground : colors.inputCommonBackground};
    color: ${isDisabled ? colors.inputDisabledText : colors.inputCommonText};
    padding: ${isPlaceholderIcon ? 58 : 16}px 16px;
    margin-bottom: ${isError ? 4 : 0}px;
    border: 1px solid ${borderColor};
    border-radius: 6px;
    box-sizing: border-box;
    resize: none;
    
    &::placeholder {
      color: ${colors.inputPlaceholderText};
    }
  `;
});

interface StyledCustomInputProps {
  isError: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  isAnyInputData: boolean;
  isPlaceholderIcon: boolean;
}

const StyledCustomInput = styled.input<StyledCustomInputProps>((props) => {
  const {
    isError,
    isFocused,
    isDisabled,
    isAnyInputData,
    isPlaceholderIcon,
    theme: {colors},
  } = props;

  let borderColor = colors.inputCommonBorder;

  if (isError) {
    borderColor = colors.inputErrorBorder;
  } else if (isDisabled) {
    borderColor = colors.inputDisabledBorder;
  }

  return `
    width: 100%;
  
    font-family: Mulish, san-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: ${isPlaceholderIcon ? 18 : 24}px;
    
    background: ${isDisabled ? colors.inputDisabledBackground : colors.inputCommonBackground};
    color: ${isDisabled ? colors.inputDisabledText : colors.inputCommonText};
    
    padding: ${isPlaceholderIcon ? 14 : 12}px 16px ${isPlaceholderIcon ? 16 : 12}px;
    padding-left: ${!isPlaceholderIcon || isAnyInputData || isFocused ? 16 : 58}px;
    margin-bottom: ${isError ? 4 : 0}px;
    border: 1px solid ${borderColor};
    border-radius: 6px;
    box-sizing: border-box;
    
    &::placeholder {
      font-size: 14px;
      line-height: 24px;
      letter-spacing: -1px;
      color: ${colors.inputPlaceholderText};
    }
  `;
});

interface CustomInputProps {
  className?: string;
  name: string;
  value: string;
  type?: string;
  placeholderIcon?: any | null;
  placeholder?: string;
  errors?: string[];
  isRequired?: boolean;
  isMultiline?: boolean;
  isDisabled?: boolean;
  rows?: number;
  onChange: any;
  isInputLimited?: boolean;
  limitCount?: number;
  readonly?: boolean;
}

const CustomInput = ({
  className,
  name,
  value,
  type = 'text',
  placeholderIcon = null,
  placeholder,
  errors,
  isRequired = false,
  isMultiline = false,
  isDisabled = false,
  isInputLimited = false,
  limitCount = 5000,
  readonly = false,
  rows = 5,
  onChange,
}: CustomInputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const isError = errors?.length > 0;
  const isPlaceholderIcon = placeholderIcon !== null;
  const isAnyInputData = value?.length > 0;
  const shouldPlaceholderIconBeDisplayed = !(isFocused || isAnyInputData);

  return (
    <StyledCustomInputWrapper
      className={className}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}>
      {placeholderIcon && (
        <PlaceholderIconContainer className="input-icon-container">
          <PlaceholderIcon
            className="input-icon"
            shouldBeDisplayed={shouldPlaceholderIconBeDisplayed}
            as={placeholderIcon}
          />
        </PlaceholderIconContainer>
      )}
      {isMultiline ? (
        <StyledCustomTextarea
          id={name}
          name={name}
          className="input-entry-field"
          value={value}
          rows={rows}
          readOnly={readonly}
          placeholder={isRequired ? placeholder + '*' : placeholder}
          isPlaceholderIcon={isPlaceholderIcon}
          isError={isError}
          isDisabled={isDisabled}
          onChange={(e) => {
            if (isInputLimited && e.target.value.length > limitCount) return;
            onChange(e);
          }}
        />
      ) : (
        <StyledCustomInput
          id={name}
          name={name}
          className="input-entry-field"
          type={type}
          value={value}
          isAnyInputData={isAnyInputData}
          placeholder={isRequired ? placeholder + '*' : placeholder}
          isPlaceholderIcon={isPlaceholderIcon}
          readOnly={readonly}
          isError={isError}
          isFocused={isFocused}
          isDisabled={isDisabled}
          onChange={(e) => {
            if (isInputLimited && e.target.value.length > limitCount) return;
            onChange(e);
          }}
        />
      )}
      {isInputLimited && <div className={'symbols-count'}>{`${value.length} / ${limitCount}`}</div>}
      {isError && <ErrorMessage className="input-error" errors={errors} />}
    </StyledCustomInputWrapper>
  );
};

export default CustomInput;
