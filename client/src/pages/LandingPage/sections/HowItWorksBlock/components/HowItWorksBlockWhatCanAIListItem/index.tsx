import React from 'react';

import styled from 'styled-components';

import Text, {TEXT_BLOCK_TYPE} from '../../../../../../components/uiKit/TextBlock';
import {ReactComponent as Wat_can_ai_list_item_check} from '../../../../../../resources/icons/Checkmark_white.svg';

const StyledHowItWorksBlockWhatCanAIListItem = styled.div`
  display: flex;
`;

const HowItWorksBlockWhatCanAIListItemCheck = styled.img`
  height: 24px;
  width: 24px;
  min-width: 24px;
  margin-left: 2px;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.secondary};
`;

interface HowItWorksBlockWhatCanAIListItemProps {
  text: string;
}

const HowItWorksBlockWhatCanAIListItem = ({
  text,
}: HowItWorksBlockWhatCanAIListItemProps): JSX.Element => {
  return (
    <StyledHowItWorksBlockWhatCanAIListItem>
      <HowItWorksBlockWhatCanAIListItemCheck as={Wat_can_ai_list_item_check} />
      <Text type={TEXT_BLOCK_TYPE.P5}>{text}</Text>
    </StyledHowItWorksBlockWhatCanAIListItem>
  );
};

export default HowItWorksBlockWhatCanAIListItem;
