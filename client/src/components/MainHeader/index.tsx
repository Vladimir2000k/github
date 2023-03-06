import React, {useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {TARIFFS} from '../../constants/values';

import {ReactComponent as MockAvatar} from '../../resources/icons/Header_mock_avatar.svg';
import {ReactComponent as Logo} from '../../resources/icons/Logo.svg';
import {ReactComponent as ProIcon} from '../../resources/icons/RoundedCheckMark.svg';
import {ReactComponent as TeamsIcon} from '../../resources/icons/Teams.svg';
import {ReactComponent as UpgradeIcon} from '../../resources/icons/Upgrade.svg';
import {useAuth} from '../../services/authState/authProvider';
import CustomButton, {BUTTON_HEIGHT, CUSTOM_BUTTON_ICON_ALIGN} from '../uiKit/Button';

const HeaderWrapper = styled.header`
  height: 73px; 
  width: 100%;
  background: ${(props) => props.theme.colors.blueishGray};
  box-shadow: 0 4px 10px rgba(24, 46, 90, 0.1);
  position: relative;
`;

const HeaderContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  padding-left: calc(100vw - 100%);
  justify-content: space-between;
`;

const RightPartWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.img`
  margin-right: 26px;
  align-self: center;
  cursor: pointer;
`;

const StyledMockAvatar = styled.img`
  margin-right: 40px;
  cursor: pointer;
`;

const HeaderPrimaryButton = styled(CustomButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-right: 20px;
  letter-spacing: -0.53px;
  padding: 0 11px;

  .button__icon-container {
    margin-right: 11px;
  }
`;

const MainHeader = ({className}: {className?: string}): JSX.Element => {
  const auth = useAuth();

  const history = useHistory();

  const {t} = useTranslation();

  const {buttonIcon, buttonText, buttonRoutePath} = useMemo(() => {
    switch (auth.currentUserData?.plan) {
      case TARIFFS.TEAMS:
        return {
          buttonIcon: TeamsIcon,
          buttonText: t('mainHeader.teamsTariff'),
          buttonRoutePath: '/tariffs',
        };
      case TARIFFS.PRO:
        return {
          buttonIcon: ProIcon,
          buttonText: t('mainHeader.proTariff'),
          buttonRoutePath: '/tariffs',
        };
      default:
        return {
          buttonIcon: UpgradeIcon,
          buttonText: t('mainHeader.upgradeTariffToPro'),
          buttonRoutePath: '/tariffs',
        };
    }
  }, [auth.currentUserData?.plan, t]);

  

  return (
    <HeaderWrapper className={className}>
      <HeaderContainer className={'container'}>
        <HeaderLogo className={'logo'} as={Logo} onClick={() => history.push('/')} />
        <RightPartWrapper className={'right-part'}>
          <StyledMockAvatar as={MockAvatar} onClick={() => history.push('/profile')} />
          <HeaderPrimaryButton
            icon={buttonIcon}
            iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
            title={buttonText}
            buttonHeight={BUTTON_HEIGHT.THIN}
            onClick={() => history.push(buttonRoutePath)}
          />
        </RightPartWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default MainHeader;
