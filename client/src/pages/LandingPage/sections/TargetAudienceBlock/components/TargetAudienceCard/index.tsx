import React from 'react';

import styled from 'styled-components';

import OptimizedPNGImage from '../../../../../../components/OptimizedPNGImage';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../../../../../components/uiKit/TextBlock';

const CardContainer = styled.div`
  display: flex;
`;

const CardHeader = styled(TextBlock)`
  margin-bottom: 8px;
`;

const CardImage = styled(OptimizedPNGImage)`
  align-self: center;
  margin-right: 20px;
  height: 78px;
`;

interface TargetAudienceCardProps {
  icon: string;
  headerText: string;
  contentText: string;
}

const TargetAudienceCard = ({
  icon,
  headerText,
  contentText,
}: TargetAudienceCardProps): JSX.Element => {
  return (
    <CardContainer>
      <CardImage src={icon} />
      <div>
        <CardHeader type={TEXT_BLOCK_TYPE.H3}>{headerText}</CardHeader>
        <TextBlock type={TEXT_BLOCK_TYPE.P6}>{contentText}</TextBlock>
      </div>
    </CardContainer>
  );
};

export default TargetAudienceCard;
