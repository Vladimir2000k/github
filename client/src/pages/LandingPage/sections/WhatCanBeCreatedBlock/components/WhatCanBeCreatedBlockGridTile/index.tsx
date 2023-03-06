import React from 'react';

import styled from 'styled-components';

import OptimizedPNGImage from '../../../../../../components/OptimizedPNGImage';
import Text, {TEXT_BLOCK_TYPE} from '../../../../../../components/uiKit/TextBlock';

const StyledWhatCanBeCreatedBlockGridTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 276px;
  position: relative;
  height: 324px;
`;

const WhatCanBeCreatedBlockGridTileImage = styled(OptimizedPNGImage)`
  height: 130px;
  width: 166px;
  align-self: center;
`;

const WhatCanBeCreatedBlockGridTileList = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  & > li {
    list-style-type: '— ';
  }
`;

const StyledCardContentWrapper = styled.div`
  background: ${(props) => props.theme.colors.blueishGray};
  padding: 63px 7px 0 20px;
  position: absolute;
  top: 65px;
  z-index: -1;
  box-sizing: border-box;
  border-radius: 20px;
  height: 260px;
  width: 100%;
  white-space: pre-line;
`;

interface WhatCanBeCreatedBlockGridTileProps {
  image: string;
  headingText: string;
  listItems: string[];
}

const WhatCanBeCreatedBlockGridTile = ({
  image,
  headingText,
  listItems,
}: WhatCanBeCreatedBlockGridTileProps): JSX.Element => {
  return (
    <StyledWhatCanBeCreatedBlockGridTile>
      <WhatCanBeCreatedBlockGridTileImage src={image} />
      <StyledCardContentWrapper>
        <Text type={TEXT_BLOCK_TYPE.H4}>{headingText}</Text>
        <WhatCanBeCreatedBlockGridTileList>
          {listItems.map((item) => (
            <li key={item}>
              <Text type={TEXT_BLOCK_TYPE.P6}>{item}</Text>
            </li>
          ))}
        </WhatCanBeCreatedBlockGridTileList>
      </StyledCardContentWrapper>
    </StyledWhatCanBeCreatedBlockGridTile>
  );
};

export default WhatCanBeCreatedBlockGridTile;
