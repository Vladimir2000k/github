import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import Text, {TEXT_BLOCK_TYPE} from '../../../../components/uiKit/TextBlock';
import GridTileImage1 from '../../../../resources/images/Landing_what_can_be_created_block_grid_image_1.png';
import GridTileImage2 from '../../../../resources/images/Landing_what_can_be_created_block_grid_image_2.png';
import GridTileImage3 from '../../../../resources/images/Landing_what_can_be_created_block_grid_image_3.png';
import GridTileImage4 from '../../../../resources/images/Landing_what_can_be_created_block_grid_image_4.png';
import GridTileImage5 from '../../../../resources/images/Landing_what_can_be_created_block_grid_image_5.png';
import GridTileImage6 from '../../../../resources/images/Landing_what_can_be_created_block_grid_image_6.png';

import WhatCanBeCreatedBlockGridTile from './components/WhatCanBeCreatedBlockGridTile';

const StyledWhatCanBeCreatedBlock = styled.div`
  margin-top: 60px;
`;

const WhatCanBeCreatedBlockHeadingText = styled(Text)`
  text-align: center;
  white-space: pre-line;
`;

const WhatCanBeCreatedBlockGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-row-gap: 20px;
  grid-template-columns: repeat(3, 276px);
  grid-column-gap: 30px;
  margin-top: 30px;
`;

const WhatCanBeCreatedBlock = (): JSX.Element => {
  const {t} = useTranslation();

  return (
    <StyledWhatCanBeCreatedBlock>
      <WhatCanBeCreatedBlockHeadingText type={TEXT_BLOCK_TYPE.H1}>
        {t('landing.whatCanBeCreatedBlock.headingText')}
      </WhatCanBeCreatedBlockHeadingText>
      <WhatCanBeCreatedBlockGrid>
        <WhatCanBeCreatedBlockGridTile
          image={GridTileImage1}
          headingText={t('landing.whatCanBeCreatedBlock.gridTile1HeadingText')}
          listItems={[
            t('landing.whatCanBeCreatedBlock.gridTile1ListItemText1'),
            t('landing.whatCanBeCreatedBlock.gridTile1ListItemText2'),
            t('landing.whatCanBeCreatedBlock.gridTile1ListItemText3'),
          ]}
        />
        <WhatCanBeCreatedBlockGridTile
          image={GridTileImage2}
          headingText={t('landing.whatCanBeCreatedBlock.gridTile2HeadingText')}
          listItems={[
            t('landing.whatCanBeCreatedBlock.gridTile2ListItemText1'),
            t('landing.whatCanBeCreatedBlock.gridTile2ListItemText2'),
            t('landing.whatCanBeCreatedBlock.gridTile2ListItemText3'),
          ]}
        />
        <WhatCanBeCreatedBlockGridTile
          image={GridTileImage3}
          headingText={t('landing.whatCanBeCreatedBlock.gridTile3HeadingText')}
          listItems={[
            t('landing.whatCanBeCreatedBlock.gridTile3ListItemText1'),
            t('landing.whatCanBeCreatedBlock.gridTile3ListItemText2'),
            t('landing.whatCanBeCreatedBlock.gridTile3ListItemText3'),
          ]}
        />
        <WhatCanBeCreatedBlockGridTile
          image={GridTileImage4}
          headingText={t('landing.whatCanBeCreatedBlock.gridTile4HeadingText')}
          listItems={[
            t('landing.whatCanBeCreatedBlock.gridTile4ListItemText1'),
            t('landing.whatCanBeCreatedBlock.gridTile4ListItemText2'),
            t('landing.whatCanBeCreatedBlock.gridTile4ListItemText3'),
          ]}
        />
        <WhatCanBeCreatedBlockGridTile
          image={GridTileImage5}
          headingText={t('landing.whatCanBeCreatedBlock.gridTile5HeadingText')}
          listItems={[
            t('landing.whatCanBeCreatedBlock.gridTile5ListItemText1'),
            t('landing.whatCanBeCreatedBlock.gridTile5ListItemText2'),
            t('landing.whatCanBeCreatedBlock.gridTile5ListItemText3'),
          ]}
        />
        <WhatCanBeCreatedBlockGridTile
          image={GridTileImage6}
          headingText={t('landing.whatCanBeCreatedBlock.gridTile6HeadingText')}
          listItems={[
            t('landing.whatCanBeCreatedBlock.gridTile6ListItemText1'),
            t('landing.whatCanBeCreatedBlock.gridTile6ListItemText2'),
            t('landing.whatCanBeCreatedBlock.gridTile6ListItemText3'),
          ]}
        />
      </WhatCanBeCreatedBlockGrid>
    </StyledWhatCanBeCreatedBlock>
  );
};

export default WhatCanBeCreatedBlock;
