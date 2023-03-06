import React, {FunctionComponent, useCallback, useMemo, useState, useRef} from 'react';

import styled from 'styled-components';

import {ReactComponent as Localization_RU} from '../../../../resources/icons/Localization_RU.svg';
import {ReactComponent as Localization_EN} from '../../../../resources/icons/Localization_EN.svg';
import {SITE_LANG_OPTIONS} from '../../../../store/appGlobal/types';
import useOutsideClickHandler from '../../../../utils/useOutsideClickHandler';

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: fit-content;
  position: relative;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  background: none;
  cursor: pointer;
  user-select: none;

  padding: 30px 0 0;
  margin-right: 72px;
`;

const StyledDropdownOption = styled.div`
  color: ${(props) => props.theme.colors.blueishGrey43};
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const LanguageSelectOptionsContainer = styled.div<{visible: boolean}>`
  margin-top: 4px;
  position: absolute;
  left: -4px;
  top: 100%;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px ${(props) => props.theme.colors.grey20} solid;
  border-radius: 4px;
`;

const HeaderLocalizationIcon = styled.img``;

const FixedSizeLocalizationNameSpan = styled.span`
  min-width: 32px;
`;

interface LocalisationData {
  languageName: keyof typeof SITE_LANG_OPTIONS;
  languageIcon: FunctionComponent;
}

interface HeaderLocalizationDropdownProps {
  selectedLanguage: SITE_LANG_OPTIONS;
  onOptionSelect: (SITE_LANG_OPTIONS) => void;
  className?: string;
}

const HeaderLocalizationDropdown = ({
  selectedLanguage,
  onOptionSelect,
  className,
}: HeaderLocalizationDropdownProps): JSX.Element => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const selectContainerRef = useRef(null);
  useOutsideClickHandler(selectContainerRef, () => setIsDropdownVisible(false));

  const localizationIcons = {
    EN: Localization_EN,
    // RU: Localization_RU,
  };

  const localizationData = (
    Object.keys(SITE_LANG_OPTIONS) as Array<keyof typeof SITE_LANG_OPTIONS>
  ).map((key): LocalisationData => {
    return {
      languageName: key,
      languageIcon: localizationIcons[key],
    };
  });

  const selectedLanguageDisplayData = useMemo(() => {
    const dataToDisplay = localizationData.find(
      (localizationData) => localizationData.languageName === selectedLanguage,
    );
    return (
      <StyledDropdownOption>
        <HeaderLocalizationIcon as={Localization_EN} />
        <FixedSizeLocalizationNameSpan>{'EN'}</FixedSizeLocalizationNameSpan>
      </StyledDropdownOption>
    );
    // return (
    //   <StyledDropdownOption>
    //     <HeaderLocalizationIcon as={dataToDisplay.languageIcon} />
    //     <FixedSizeLocalizationNameSpan>{dataToDisplay.languageName}</FixedSizeLocalizationNameSpan>
    //   </StyledDropdownOption>
    // );
  }, [localizationData, selectedLanguage]);

  // Mock callback for language selection
  const handleOptionSelect = useCallback(
    ({languageName}: LocalisationData) => {
      onOptionSelect(languageName);
    },
    [onOptionSelect],
  );

  return (
    <SelectContainer
      className={className}
      ref={selectContainerRef}
      onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
      {selectedLanguageDisplayData}
      <LanguageSelectOptionsContainer visible={isDropdownVisible}>
        {localizationData.map((language) => (
          <StyledDropdownOption
            key={language.languageName}
            onClick={() => handleOptionSelect(language)}>
            <HeaderLocalizationIcon as={language.languageIcon} />
            <FixedSizeLocalizationNameSpan>{language.languageName}</FixedSizeLocalizationNameSpan>
          </StyledDropdownOption>
        ))}
      </LanguageSelectOptionsContainer>
    </SelectContainer>
  );
};

export default HeaderLocalizationDropdown;
