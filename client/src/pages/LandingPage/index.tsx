import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/LandingHeader';
import LandingPagesContainer from '../../components/LandingPagesContainer';

import HowItWorksBlock from './sections/HowItWorksBlock';
import MainBlock from './sections/MainBlock';
import TargetAudienceBlock from './sections/TargetAudienceBlock';
import WhatCanBeCreatedBlock from './sections/WhatCanBeCreatedBlock';

const LandingPage = (): JSX.Element => {
  return (
    <LandingPagesContainer>
      <Header />
      <MainBlock />
      <HowItWorksBlock />
      <WhatCanBeCreatedBlock />
      <TargetAudienceBlock />
      <Footer />
    </LandingPagesContainer>
  );
};

export default LandingPage;
