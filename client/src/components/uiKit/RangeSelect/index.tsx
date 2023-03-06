import React from 'react';

import {Range, getTrackBackground} from 'react-range';
import styled from 'styled-components';

import TextBlock, {TEXT_BLOCK_TYPE} from '../TextBlock';

const StyledRangeWrapper = styled.div<{disabled?: boolean}>`
  position: relative;

  .range-labels-wrapper {
    display: flex;
    flex: 1;
    margin-bottom: 5px;
    justify-content: space-between;

    &__label {
      opacity: ${({disabled}) => (disabled ? 0.4 : 1)};
      color: ${({disabled}) => (disabled ? '#252C32' : '#3f44d0')};
    }
  }

  .range-track {
    height: 2px;
    border-radius: 1px;
    width: 100%;
  }

  .range-thumb {
    box-sizing: border-box;
    background: ${({disabled}) => (disabled ? '#F6F8F9' : '#3f44d0')};
    border: ${({disabled}) => (disabled ? '1px solid #E5E9EB' : 'none')};
    width: 10px;
    height: 10px;
  }

  .range-thumb:first-child {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    margin-left: 5px;
  }

  .range-thumb:last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    margin-right: 5px;
  }
`;

interface RangeSelectProps {
  className?: string;
  minNumber: number;
  maxNumber: number;
  step: number;
  disabled?: boolean;
  onChange: (values: Array<number>) => void;
  values: Array<number>;
}

const RangeSelect = ({
  className,
  minNumber,
  maxNumber,
  step = 1,
  disabled,
  onChange,
  values,
}: RangeSelectProps): JSX.Element => {
  return (
    <StyledRangeWrapper className={className} disabled={disabled}>
      <div className={'range-labels-wrapper'}>
        <TextBlock className={'range-labels-wrapper__label'} type={TEXT_BLOCK_TYPE.P7}>
          {values[0]}
        </TextBlock>
        <TextBlock className={'range-labels-wrapper__label'} type={TEXT_BLOCK_TYPE.P7}>
          {values[1]}
        </TextBlock>
      </div>
      <Range
        disabled={disabled}
        step={step}
        min={minNumber}
        max={maxNumber}
        values={values}
        onChange={onChange}
        renderTrack={({props, children}) => (
          <div
            ref={props.ref}
            className={'range-track'}
            style={{
              background: getTrackBackground({
                values,
                colors: ['#DDE2E4', disabled ? '#D5DADD' : '#3F44D0', '#DDE2E4'],
                min: minNumber,
                max: maxNumber,
              }),
            }}>
            {children}
          </div>
        )}
        renderThumb={({props}) => <div className={'range-thumb'} {...props} />}
      />
    </StyledRangeWrapper>
  );
};

export default RangeSelect;
