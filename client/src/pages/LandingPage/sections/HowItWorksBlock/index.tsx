import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import OptimizedPNGImage from '../../../../components/OptimizedPNGImage';
import Text, {TEXT_BLOCK_TYPE} from '../../../../components/uiKit/TextBlock';
import {ReactComponent as Ascending_dotted_line} from '../../../../resources/icons/Ascending_dotted_line.svg';
import {ReactComponent as Cloud} from '../../../../resources/icons/Cloud_what_can_ai_image.svg';
import {ReactComponent as Descending_dotted_line} from '../../../../resources/icons/Descending_dotted_line.svg';
import Landing_how_it_works_block_image_1 from '../../../../resources/images/Landing_how_it_works_block_image_1.png';
import Landing_how_it_works_block_image_2 from '../../../../resources/images/Landing_how_it_works_block_image_2.png';
import Landing_how_it_works_block_image_3 from '../../../../resources/images/Landing_how_it_works_block_image_3.png';
import Mock_landing_what_can_ai_do_image from '../../../../resources/images/Landing_what_can_ai_do_block_image.png';

import HowItWorksBlockUsageStepCard from './components/HowItWorksBlockStep';
import HowItWorksBlockWhatCanAIListItem from './components/HowItWorksBlockWhatCanAIListItem';

const StyledHowItWorksBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const HowItWorksBlockHeadingText = styled(Text)`
  margin-bottom: 10px;
`;

const HowItWorksBlockDescriptionText = styled(Text)`
  margin-bottom: 30px;
  text-align: center;
  white-space: pre-line;
`;

const HowItWorksBlockStepsContainer = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
`;

const HowItWorksBlockWhatCanAIContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 76px;
`;

const HowItWorksBlockCloudImage = styled.img`
  position: absolute;
  z-index: -100;
  top: -40px;
  right: -185px;
`;

const HowItWorksBlockWhatCanAIHeading = styled(Text)`
  white-space: pre-line;
`;

const HowItWorksBlockWhatCanAIImage = styled(OptimizedPNGImage)`
  margin-right: 94px;
  max-height: 420px;
`;

const AscendingDottedLine = styled.img`
  position: absolute;
  top: 96px;
  left: 256px;
`;

const DescendingDottedLine = styled.img`
  position: absolute;
  top: 72px;
  left: 627px;
`;

const HowItWorksBlockWhatCanAIContentContainer = styled.div`
  margin-top: 34px;
`;

const HowItWorksBlockWhatCanAIList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const HowItWorksBlockWhatCanAIAdditionalText = styled(Text)`
  margin-top: 30px;
`;

const HowItWorksBlock = (): JSX.Element => {
  const {t} = useTranslation();

  return (
    <StyledHowItWorksBlock>
      <HowItWorksBlockHeadingText type={TEXT_BLOCK_TYPE.H1}>
        {t('landing.howItWorks.heading')}
      </HowItWorksBlockHeadingText>
      <HowItWorksBlockDescriptionText type={TEXT_BLOCK_TYPE.P1}>
        {t('landing.howItWorks.lead')}
      </HowItWorksBlockDescriptionText>
      <HowItWorksBlockStepsContainer>
        <HowItWorksBlockUsageStepCard
          image={Landing_how_it_works_block_image_1}
          text={t('landing.howItWorks.step1')}
        />
        <AscendingDottedLine as={Ascending_dotted_line} />
        <HowItWorksBlockUsageStepCard
          image={Landing_how_it_works_block_image_2}
          text={t('landing.howItWorks.step2')}
        />
        <DescendingDottedLine as={Descending_dotted_line} />
        <HowItWorksBlockUsageStepCard
          image={Landing_how_it_works_block_image_3}
          text={t('landing.howItWorks.step3')}
        />
      </HowItWorksBlockStepsContainer>
      <HowItWorksBlockWhatCanAIContainer>
        <HowItWorksBlockCloudImage as={Cloud} />
        <HowItWorksBlockWhatCanAIImage src={Mock_landing_what_can_ai_do_image} alt="" />
        <HowItWorksBlockWhatCanAIContentContainer>
          <HowItWorksBlockWhatCanAIHeading type={TEXT_BLOCK_TYPE.H2}>
            {t('landing.howItWorks.whatCanHeading')}
          </HowItWorksBlockWhatCanAIHeading>
          <HowItWorksBlockWhatCanAIList>
            <HowItWorksBlockWhatCanAIListItem text={t('landing.howItWorks.whatCan1')} />
            <HowItWorksBlockWhatCanAIListItem text={t('landing.howItWorks.whatCan2')} />
            <HowItWorksBlockWhatCanAIListItem text={t('landing.howItWorks.whatCan3')} />
            <HowItWorksBlockWhatCanAIListItem text={t('landing.howItWorks.whatCan4')} />
          </HowItWorksBlockWhatCanAIList>
          <HowItWorksBlockWhatCanAIAdditionalText type={TEXT_BLOCK_TYPE.P2}>
            {t('landing.howItWorks.whatCanAdditional')}
          </HowItWorksBlockWhatCanAIAdditionalText>
        </HowItWorksBlockWhatCanAIContentContainer>
      </HowItWorksBlockWhatCanAIContainer>
    </StyledHowItWorksBlock>
  );
};

export default HowItWorksBlock;
