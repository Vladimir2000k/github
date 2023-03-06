import React from 'react';

import styled from 'styled-components';

import StrikeThroughImage from '../../../../resources/images/Strikethrough.png';

const StyledStrikethroughText = styled.span`
  position: relative;

  &::after {
    content: '';

    position: absolute;
    left: -4px;
    right: -4px;
    top: 0;
    bottom: -2px;
    z-index: 1000;

    height: 100%;

    background-image: url(${StrikeThroughImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
  }
`;

const StrikethroughText = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}): JSX.Element => {
  return <StyledStrikethroughText className={className}>{children}</StyledStrikethroughText>;
};

export default StrikethroughText;
