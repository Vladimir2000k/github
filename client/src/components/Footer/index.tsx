import React from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as CloudFooter} from '../../resources/icons/Cloud_footer.svg';
import {ReactComponent as Logo} from '../../resources/icons/Logo.svg';
// import {ReactComponent as InstagramIcon} from '../../resources/icons/Social Icons-White-Instagram.svg';
// import {ReactComponent as TwitterIcon} from '../../resources/icons/Social Icons-White-Twitter.svg';
// import {ReactComponent as YoutubeIcon} from '../../resources/icons/Social Icons-White-Youtube.svg';
import CustomLink from '../uiKit/Link';
import Text, {TEXT_BLOCK_TYPE} from '../uiKit/TextBlock';

const FooterLogo = styled.img`
  width: 246px;
  height: 70px;
  cursor: pointer;
`;

const CopyrightText = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
`;

const FooterBottomPart = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 25px 0;
`;

// const SocialMediaButtonsWrapper = styled.div`
//   display: flex;
//   gap: 16px;
// `;

const HorizontalSeparator = styled.hr`
  opacity: 0.2;
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.colors.primary};
`;

const NavButtonsContainer = styled.div`
  margin: 20px 0 28px;
  justify-content: center;
  display: flex;
  gap: 24px;
`;

const StyledFooter = styled.div`
  margin-top: 91px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
`;

// const SocialIcon = styled.img`
//   cursor: pointer;
// `;

const StyledCloudFooter = styled.img`
  position: absolute;
  z-index: -100;
  bottom: 0;
`;

const Footer = (): JSX.Element => {
  const history = useHistory();

  const {t} = useTranslation();

  return (
    <StyledFooter>
      <FooterLogo as={Logo} onClick={() => history.push('/')} />
      <NavButtonsContainer>
        <CustomLink to="/" activeClassName="activeNavButton" exact={true}>
          {t('landing.footer.main')}
        </CustomLink>
        <CustomLink to="/tariffs" activeClassName="activeNavButton">
          {t('landing.footer.tariffs')}
        </CustomLink>
        <CustomLink to="/contact-us" activeClassName="activeNavButton">
          {t('landing.footer.contactUs')}
        </CustomLink>
        <CustomLink to="/blog" activeClassName="activeNavButton">
          {t('landing.footer.blog')}
        </CustomLink>
        <CustomLink
          to="/docs/Privacy%20ai%20Disraeli.pdf"
          target="_blank"
          activeClassName="activeNavButton">
          {t('landing.footer.privacyPolicy')}
        </CustomLink>
      </NavButtonsContainer>
      <HorizontalSeparator />
      <FooterBottomPart>
        <CopyrightText type={TEXT_BLOCK_TYPE.P7}>
          © 2021 AI Disraeli. {t('landing.footer.allRightsAreProtected')}
        </CopyrightText>
        {/*<SocialMediaButtonsWrapper>*/}
        {/*  <SocialIcon as={InstagramIcon} />*/}
        {/*  <SocialIcon as={TwitterIcon} />*/}
        {/*  <SocialIcon as={YoutubeIcon} />*/}
        {/*</SocialMediaButtonsWrapper>*/}
      </FooterBottomPart>
      <StyledCloudFooter as={CloudFooter} />
    </StyledFooter>
  );
};

export default Footer;
