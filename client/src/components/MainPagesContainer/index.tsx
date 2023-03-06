import React from 'react';

import styled from 'styled-components';

import Header from '../MainHeader';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .header .container {
    height: 73px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    flex: 1;
  }
`;

const MainPagesContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <MainContainer className={className}>
      <Header className={'header'} />
      <div className={'content-container'}>{children}</div>
    </MainContainer>
  );
};

export default MainPagesContainer;
