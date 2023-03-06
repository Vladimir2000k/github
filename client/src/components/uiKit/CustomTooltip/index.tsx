import React from 'react';

import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import styled from 'styled-components';

export enum CUSTOM_TOOLTIP_PLACEMENT {
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

const StyledTooltip = styled(Tooltip)`
  opacity: 1 !important;
  top: 0;
  left: 0;
  &.tooltip {
    display: block !important;
  }

  .tooltip-arrow::before {
    border-right-color: ${({theme}) => theme.colors.white};
  }

  .tooltip-arrow::after {
    content: '';
    position: absolute;
    left: 100%;
    z-index: -1;
    border: 5px solid #fff;
    transform-origin: 0 0;
    transform: rotate(45deg);
    box-shadow: -1px 3px 4px -1px rgb(0 0 0 / 15%);
  }

  .tooltip-inner {
    color: ${({theme}) => theme.colors.realPrimary};
    font-size: 10px;
    max-width: 174px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
    line-height: 13px;
    padding: 10px 10px 10px 16px;
    background-color: ${({theme}) => theme.colors.white};
  }
`;

interface CustomTooltipProps {
  title: string;
  children: React.ReactElement;
  className?: string;
}

const CustomTooltip = ({title, children, className}: CustomTooltipProps): JSX.Element => {
  return (
    <OverlayTrigger
      placement={CUSTOM_TOOLTIP_PLACEMENT.RIGHT}
      onExiting={(node) => (node.style.display = 'none')}
      overlay={<StyledTooltip className={className}>{title}</StyledTooltip>}>
      {children}
    </OverlayTrigger>
  );
};

export default CustomTooltip;
