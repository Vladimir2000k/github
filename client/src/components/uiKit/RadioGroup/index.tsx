import React, {useCallback, useMemo, useState} from 'react';

import styled from 'styled-components';

import TextBlock, {TEXT_BLOCK_TYPE} from '../TextBlock';

const ITEM_HORIZONTAL_PADDING = 15;

const RadioContainer = styled.div`
  background: ${({theme}) => theme.colors.white};
  border: 1px solid #979797;
  border-radius: 22px;
  display: flex;
  height: fit-content;
  width: fit-content;
  user-select: none;
  position: relative;

  .items-container {
    display: flex;
  }

  .radio-item {
    transition: color 0.3s ease-in-out;
    padding: ${ITEM_HORIZONTAL_PADDING}px 30px;
    z-index: 2000;
    color: #848199;
    line-height: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  .radio-item_selected {
    color: ${({theme}) => theme.colors.white};
  }
`;

const FloatingActiveBackground = styled.div<{
  left: number;
  width: number;
  isParentContainerHovered: boolean;
  isLastElement: boolean;
  isFirstElement: boolean;
}>(({left, width, isParentContainerHovered, isLastElement, isFirstElement}) => {
  let margin = '';
  let widthHoverDelta = 0;

  if (isFirstElement && isParentContainerHovered) {
    margin = 'margin-right: -10px;';
    widthHoverDelta = 10;
  }

  if (isLastElement && isParentContainerHovered) {
    margin = 'margin-left: -10px;';
    widthHoverDelta = 10;
  }

  if (!isLastElement && !isFirstElement && isParentContainerHovered) {
    margin = 'margin-left: -10px;';
    widthHoverDelta = 20;
  }

  return `
    ${margin}
    background: #0b008c;
    border-radius: 22px;
    height: 100%;
    left: ${left}px;
    z-index: 1000;
    width: ${width + widthHoverDelta}px;
    position: absolute;
    transition: all 0.3s ease-in-out;
  `;
});

export interface RadioGroupOption<ValuesEnum> {
  label: string;
  value: ValuesEnum;
}

interface RadioGroupProps<ValuesEnum> {
  className?: string;
  options: Array<RadioGroupOption<ValuesEnum>>;
  selectedOptionValue: ValuesEnum;
  onSelectOption: (index: number) => void;
}

const RadioGroup = <ValuesEnum,>({
  className,
  options,
  selectedOptionValue,
  onSelectOption,
}: RadioGroupProps<ValuesEnum>): JSX.Element => {
  const [itemsContainerRef, setItemsContainerRef] = useState<HTMLDivElement>();
  const [isRadioContainerHovered, setIsRadioContainerHovered] = useState(false);

  const handleRefChange = useCallback(
    (node) => {
      if (node) {
        setItemsContainerRef(node);
      }
    },
    [setItemsContainerRef],
  );

  const activeItemIndex = useMemo(() => {
    return options.findIndex((item) => item.value === selectedOptionValue);
  }, [options, selectedOptionValue]);

  const htmlRadioChildren = useMemo(() => {
    return Array.from(itemsContainerRef?.children || []) as Array<HTMLDivElement>;
  }, [itemsContainerRef]);

  const {activeItemWidth, positionDeltaFromStart} = useMemo(() => {
    let activeItemWidth = 0;
    let positionDeltaFromStart = 0;
    htmlRadioChildren.some((child, index) => {
      if (index !== activeItemIndex) {
        positionDeltaFromStart += child.offsetWidth;
        return false;
      } else {
        activeItemWidth = child.offsetWidth;
        return true;
      }
    });
    return {activeItemWidth, positionDeltaFromStart};
  }, [activeItemIndex, htmlRadioChildren]);

  return (
    <RadioContainer
      className={className}
      onMouseOver={() => setIsRadioContainerHovered(true)}
      onMouseLeave={() => setIsRadioContainerHovered(false)}>
      <FloatingActiveBackground
        isFirstElement={activeItemIndex === 0}
        isLastElement={activeItemIndex === options.length - 1}
        isParentContainerHovered={isRadioContainerHovered}
        left={positionDeltaFromStart}
        width={activeItemWidth}
      />
      <div className={'items-container'} ref={handleRefChange}>
        {options.map((item, index) => (
          <TextBlock
            key={item.value.toString()}
            className={`radio-item ${
              selectedOptionValue === item.value ? 'radio-item_selected' : ''
            }`}
            onClick={() => onSelectOption(index)}
            type={TEXT_BLOCK_TYPE.P7}>
            {item.label}
          </TextBlock>
        ))}
      </div>
    </RadioContainer>
  );
};

export default RadioGroup;
