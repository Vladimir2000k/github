import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  .label {
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    color: ${(props) => props.theme.colors.grey55};
  }
`;

interface CustomLabelProps {
  className?: string;
  children: React.ReactNode;
}

const CustomLabel = ({className, children}: CustomLabelProps): JSX.Element => {
  return (
    <Container className={className}>
      <div className={'label'}>{children}</div>
    </Container>
  );
};

export default CustomLabel;
