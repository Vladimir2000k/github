import React from 'react';

import styled from 'styled-components';

import OptimizedPNGImage from '../../../../../../components/OptimizedPNGImage';
import Text, {TEXT_BLOCK_TYPE} from '../../../../../../components/uiKit/TextBlock';

const StyledHowItWorksBlockUsageStepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 338px;
  padding: 16px 0 10px;
`;

const HowItWorksBlockUsageStepCardImage = styled(OptimizedPNGImage)`
  height: 160px;
  margin-bottom: 16px;
`;

const HowItWorksBlockUsageStepCardDetails = styled(Text)`
  text-align: center;
  color: ${(props) => props.theme.colors.grey27};
`;

interface HowItWorksBlockUsageStepCardProps {
  image: string;
  text: string;
}

const HowItWorksBlockUsageStepCard = ({
  image,
  text,
}: HowItWorksBlockUsageStepCardProps): JSX.Element => {
  return (
    <StyledHowItWorksBlockUsageStepCard>
      <HowItWorksBlockUsageStepCardImage src={image} />
      <HowItWorksBlockUsageStepCardDetails type={TEXT_BLOCK_TYPE.P3}>
        {text}
      </HowItWorksBlockUsageStepCardDetails>
    </StyledHowItWorksBlockUsageStepCard>
  );
};

export default HowItWorksBlockUsageStepCard;
