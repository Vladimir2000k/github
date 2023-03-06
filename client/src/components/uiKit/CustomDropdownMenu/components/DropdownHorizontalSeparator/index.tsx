import React from 'react';

import styled from 'styled-components';

const Separator = styled.div`
  background: #f2f0f9;
  width: 89.5%;
  height: 1px;
  margin: 10px 0;
`;

const DropdownHorizontalSeparator = (): JSX.Element => {
  return <Separator />;
};

export default DropdownHorizontalSeparator;
