import React, {useCallback, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as CloudTopLeft} from '../../resources/icons/Cloud_image_top_left.svg';
import {ReactComponent as Logo} from '../../resources/icons/Logo.svg';
import {useAuth} from '../../services/authState/authProvider';
import {selectAppLanguage} from '../../store/appGlobal/selectors';
import {SITE_LANG_OPTIONS} from '../../store/appGlobal/types';
import {AppGlobalActions} from '../../store/common/reducerActions';
import CustomButton, {BUTTON_HEIGHT} from '../uiKit/Button';

import HeaderLocalizationDropdown from './components/HeaderLocalizationDropdown';
import HeaderNavButton from './components/HeaderNavButton';

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
`;

const CloudImageTopLeft = styled.img`
  position: absolute;
  z-index: -100;
  left: -315px;
`;

const HeaderLogo = styled.img`
  min-width: 155px;
  margin-right: 26px;
  align-self: flex-end;
  cursor: pointer;
`;

const StyledHeaderLocalizationDropdown = styled(HeaderLocalizationDropdown)``;

const HeaderLoginButton = styled.div`
  height: fit-content;

  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
  user-select: none;

  padding: 30px 0 0;
  margin-right: 30px;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const HeaderNavBar = styled.div`
  display: flex;
`;

const HeaderPrimaryButton = styled(CustomButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-top: 20px;
  margin-right: 20px;
  letter-spacing: -0.53px;
`;

const LandingHeader = (): JSX.Element => {
  const currentLanguage = useSelector(selectAppLanguage);

  const auth = useAuth();
  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  const {actionButtonText, actionButtonPath} = useMemo(() => {
    const isAuthorized = auth.currentUserData;
    return {
      actionButtonText: isAuthorized
        ? t('landing.header.profile')
        : t('landing.header.registration'),
      actionButtonPath: isAuthorized ? '/workspaces' : '/auth/registration',
    };
  }, [auth.currentUserData, t]);

  const handleLocalizationDropdownOptionSelect = useCallback(
    (languageName: SITE_LANG_OPTIONS) => {
      dispatch(AppGlobalActions.setLanguage(languageName));
    },
    [dispatch],
  );
 
  setInterval(() => {
    const ddddsss = document.getElementById('ddddsss');
    ddddsss?.addEventListener('click', function() {
      if (ddddsss.checked) {
        document.getElementById('mobsd')?.classList.add('activeof');
      }else{
        document.getElementById('mobsd')?.classList.remove('activeof');
      }
    });
    // log clear
 
  }, 1500);



  return (
    <StyledHeader>
      <CloudImageTopLeft as={CloudTopLeft} />
      <HeaderLogo as={Logo} onClick={() => history.push('/')} />
      <div className="mob-menus">
        <input type="checkbox"  id="ddddsss"/>
        <div className="mob-menus__btn"> 
          <span></span>
          <span className="nch_sd"></span>
        </div>

      </div>
      <HeaderNavBar id="mobsd">
        <HeaderNavButton to="/" activeClassName="activeNavButton" exact={true}>
          {t('landing.header.main')}
        </HeaderNavButton>
        <HeaderNavButton to="/tariffs" activeClassName="activeNavButton">
          {t('landing.header.tariffs')}
        </HeaderNavButton>
        <HeaderNavButton to="/contact-us" activeClassName="activeNavButton">
          {t('landing.header.contactUs')}
        </HeaderNavButton>
        <HeaderNavButton to="/blog" activeClassName="activeNavButton">
          {t('landing.header.blog')}
        </HeaderNavButton>
        <HeaderLoginButton onClick={() => history.push('/auth/login')}>
          {t('landing.header.login')}
        </HeaderLoginButton>
        <StyledHeaderLocalizationDropdown
          selectedLanguage={currentLanguage}
          onOptionSelect={handleLocalizationDropdownOptionSelect}
        />
        <HeaderPrimaryButton
          title={actionButtonText}
          buttonHeight={BUTTON_HEIGHT.THIN}
          onClick={() => history.push(actionButtonPath)}
        />
      </HeaderNavBar>
    </StyledHeader>
  );
};


export default LandingHeader;
