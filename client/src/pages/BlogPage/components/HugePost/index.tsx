import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import EllipsisText from '../../../../components/ElipsisText';
import CustomButton, {BUTTON_HEIGHT} from '../../../../components/uiKit/Button';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../../../components/uiKit/TextBlock';
import {ReactComponent as Right_arrow} from '../../../../resources/icons/Fiiled_round_with_right_arrow.svg';
import {BlogPostModel} from '../../../../services/models';
import MetaData from '../MetaData';

const HugePostContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 408px;
  gap: 32px;
`;

const HugePostPhoto = styled.div<{photo: string}>`
  min-width: 614px;
  height: 408px;
  background-image: url('${(props) => props.photo}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
`;

const HugePostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0 20px;
`;

const HugePostHeadingText = styled.div`
  margin-top: 16px;
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  color: ${(props) => props.theme.colors.primary};
`;

const HugePostSummary = styled(TextBlock)`
  margin-top: 20px;
  white-space: pre-line;
  color: ${(props) => props.theme.colors.primary};
`;

const HugePostButtonContainer = styled.div`
  margin-top: auto;
`;

const HugePostButton = styled(CustomButton)`
  margin-top: 20px;
`;

type HugePostProps = BlogPostModel & {
  handleContinueReadingButtonClick: () => void;
};

const HugePost = ({
  photo,
  dateCreated,
  views,
  title,
  summary,
  handleContinueReadingButtonClick,
}: HugePostProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <HugePostContainer>
      <HugePostPhoto photo={photo} />
      <HugePostContentContainer>
        <MetaData dateCreated={dateCreated} views={views} />
        <HugePostHeadingText>{title}</HugePostHeadingText>
        <EllipsisText lines={6}>
          <HugePostSummary type={TEXT_BLOCK_TYPE.P6}>{summary}</HugePostSummary>
        </EllipsisText>
        <HugePostButtonContainer>
          <HugePostButton
            title={t('blog.continueReadingButtonText')}
            buttonHeight={BUTTON_HEIGHT.THIN}
            icon={Right_arrow}
            onClick={handleContinueReadingButtonClick}
          />
        </HugePostButtonContainer>
      </HugePostContentContainer>
    </HugePostContainer>
  );
};

export default HugePost;
