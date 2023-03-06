import React from 'react';

import styled from 'styled-components';

const StyledLoader = styled.div<LoaderProps>(({size, borderWidth}) => {
  const borderWidthString = borderWidth ? `${borderWidth}px` : '0.1em';

  return `
  border-radius: 50%;
  width: 1em;
  height: 1em;

  &:after {
    border-radius: 50%;
    width: 1em;
    height: 1em;
  }

  font-size: ${size}px;
  position: relative;
  text-indent: -9999em;
  border-top: ${borderWidthString} solid #ebf7ff;
  border-right: ${borderWidthString} solid rgba(0, 0, 0, 0);
  border-bottom: ${borderWidthString} solid #ebf7ff;
  border-left: ${borderWidthString} solid #ebf7ff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  `;
});

interface LoaderProps {
  className: string;
  size: number;
  borderWidth?: number;
}

const Loader = ({className, size, borderWidth}: LoaderProps): JSX.Element => {
  return <StyledLoader className={className} size={size} borderWidth={borderWidth} />;
};

export default Loader;
