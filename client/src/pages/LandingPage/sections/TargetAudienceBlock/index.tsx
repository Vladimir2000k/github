import React from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import TryForFreeButton from '../../../../components/TryForFreeButton';
import Text, {TEXT_BLOCK_TYPE} from '../../../../components/uiKit/TextBlock';
import BloggersIcon from '../../../../resources/images/Target_audience_bloggers.png';
import CopywritersIcon from '../../../../resources/images/Target_audience_copywriters.png';
import DevsIcon from '../../../../resources/images/Target_audience_devs.png';
import JournalistsIcon from '../../../../resources/images/Target_audience_journalists.png';
import MarketerIcon from '../../../../resources/images/Target_audience_marketer.png';
import OnlineShopsIcon from '../../../../resources/images/Target_audience_online_shops.png';
import SEOIcon from '../../../../resources/images/Target_audience_SEO.png';
import StudentsIcon from '../../../../resources/images/Target_audience_students.png';

import TargetAudienceCard from './components/TargetAudienceCard';

const TargetAudienceBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const TargetAudienceBlockHeadingText = styled(Text)`
  margin-bottom: 40px;
`;

const TargetAudienceBlockTryForFreeButtonContainer = styled.div`
  margin-bottom: 15px;
`;

const TargetAudienceCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 524px);
  grid-row-gap: 30px;
  grid-column-gap: 28px;
  margin-bottom: 40px;
`;

const TargetAudienceBlock = (): JSX.Element => {
  const history = useHistory();

  const {t} = useTranslation();

  return (
    <TargetAudienceBlockContainer>
      <TargetAudienceBlockHeadingText type={TEXT_BLOCK_TYPE.H1}>
        {t('landing.targetAudience.heading')}
      </TargetAudienceBlockHeadingText>
      <TargetAudienceCardsGrid>
        <TargetAudienceCard
          icon={CopywritersIcon}
          headerText={t('landing.targetAudience.copywritersCardHeader')}
          contentText={t('landing.targetAudience.copywritersCardText')}
        />
        <TargetAudienceCard
          icon={StudentsIcon}
          headerText={t('landing.targetAudience.studentsCardHeader')}
          contentText={t('landing.targetAudience.studentsCardText')}
        />
        <TargetAudienceCard
          icon={SEOIcon}
          headerText={t('landing.targetAudience.SEOCardHeader')}
          contentText={t('landing.targetAudience.SEOCardText')}
        />
        <TargetAudienceCard
          icon={JournalistsIcon}
          headerText={t('landing.targetAudience.journalistsCardHeader')}
          contentText={t('landing.targetAudience.journalistsCardText')}
        />
        <TargetAudienceCard
          icon={BloggersIcon}
          headerText={t('landing.targetAudience.bloggersCardHeader')}
          contentText={t('landing.targetAudience.bloggersCardText')}
        />
        <TargetAudienceCard
          icon={MarketerIcon}
          headerText={t('landing.targetAudience.marketersCardHeader')}
          contentText={t('landing.targetAudience.marketersCardText')}
        />
        <TargetAudienceCard
          icon={OnlineShopsIcon}
          headerText={t('landing.targetAudience.onlineShopsCardHeader')}
          contentText={t('landing.targetAudience.onlineShopsCardText')}
        />
        <TargetAudienceCard
          icon={DevsIcon}
          headerText={t('landing.targetAudience.devsCardHeader')}
          contentText={t('landing.targetAudience.devsCardText')}
        />
      </TargetAudienceCardsGrid>
      <TargetAudienceBlockTryForFreeButtonContainer>
        <TryForFreeButton
          title={t('landing.targetAudience.tryForFreeButtonText')}
          onClick={() => history.push('/auth/registration')}
        />
      </TargetAudienceBlockTryForFreeButtonContainer>
    </TargetAudienceBlockContainer>
  );
};

export default TargetAudienceBlock;
