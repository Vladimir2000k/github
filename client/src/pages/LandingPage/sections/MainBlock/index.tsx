import React from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import OptimizedPNGImage from '../../../../components/OptimizedPNGImage';
import TryForFreeButton from '../../../../components/TryForFreeButton';
import Text, {TEXT_BLOCK_TYPE} from '../../../../components/uiKit/TextBlock';
import Main_block_img_1 from '../../../../resources/images/Landing_main_block_img_1.png';

export const StyledMainBlock = styled.div`
  position: relative;
  display: flex;
  margin-top: 42px;
  min-height: 447px;
`;

export const MainBlockLead = styled.div`
  margin-left: 62px;
`;

export const MainBlockImage = styled(OptimizedPNGImage)`
  position: absolute;
  z-index: -50;
  right: 0;
  margin-top: 35px;
  width: 512px;
`;

export const MainBlockHeadingText = styled(Text)`
  margin-bottom: 10px;
  line-height: 40px;
  letter-spacing: -0.63px;
  white-space: pre-line;
`;

export const MainBlockContentText = styled(Text)`
  margin-bottom: 40px;
  letter-spacing: -0.63px;
  white-space: pre-line;
`;

export const MainBlockTryForFreeButtonContainer = styled.div`
  display: flex;
  margin-left: 5px;
  margin-bottom: 15px;
`;

export const MainBlockContentSecondaryText = styled(Text)`
  margin-left: 38px;
  white-space: pre-line;
`;

const MainBlock = (): JSX.Element => {
  const history = useHistory();

  const {t} = useTranslation();

  return (
    <StyledMainBlock>
      <MainBlockLead>
        <MainBlockHeadingText type={TEXT_BLOCK_TYPE.H1}>
          {t('landing.main.heading')}
        </MainBlockHeadingText>
        <MainBlockContentText type={TEXT_BLOCK_TYPE.P2}>
          {t('landing.main.contentText')}
        </MainBlockContentText>
        <MainBlockTryForFreeButtonContainer>
          <TryForFreeButton
            simplified={false}
            title={t('landing.main.try4FreeButtonTitle')}
            onClick={() => history.push('/auth/registration')}
          />
        </MainBlockTryForFreeButtonContainer>
        <MainBlockContentSecondaryText type={TEXT_BLOCK_TYPE.P4}>
          {t('landing.main.contentSecondaryText')}
        </MainBlockContentSecondaryText>
      </MainBlockLead>
      <MainBlockImage src={Main_block_img_1} />
    </StyledMainBlock>
  );
};

export default MainBlock;
