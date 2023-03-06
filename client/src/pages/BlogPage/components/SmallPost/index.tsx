import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import EllipsisText from '../../../../components/ElipsisText';
import CustomButton, {BUTTON_HEIGHT} from '../../../../components/uiKit/Button';
import {ReactComponent as Right_arrow} from '../../../../resources/icons/Fiiled_round_with_right_arrow.svg';
import {BlogPostModel} from '../../../../services/models';
import MetaData from '../MetaData';

const SmallPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SmallPostPhoto = styled.div<{photo: string}>`
  min-width: 338px;
  height: 230px;
  background-image: url(${(props) => props.photo});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
`;

const SmallPostHeadingText = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const SmallPostSummary = styled.div`
  white-space: pre-line;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const SmallPostButtonContainer = styled.div`
  margin-top: auto;
`;

const SmallPostButton = styled(CustomButton)`
  margin-top: 10px;
`;

type SmallPostProps = BlogPostModel & {
  handleContinueReadingButtonClick: () => void;
};

const SmallPost = ({
  photo,
  dateCreated,
  views,
  title,
  summary,
  handleContinueReadingButtonClick,
}: SmallPostProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <SmallPostContainer>
      <SmallPostPhoto photo={photo} />
      <MetaData dateCreated={dateCreated} views={views} />
      <SmallPostHeadingText>{title}</SmallPostHeadingText>
      <EllipsisText lines={5}>
        <SmallPostSummary>{summary}</SmallPostSummary>
      </EllipsisText>
      <SmallPostButtonContainer>
        <SmallPostButton
          title={t('blog.continueReadingButtonText')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          icon={Right_arrow}
          onClick={handleContinueReadingButtonClick}
        />
      </SmallPostButtonContainer>
    </SmallPostContainer>
  );
};

export default SmallPost;
