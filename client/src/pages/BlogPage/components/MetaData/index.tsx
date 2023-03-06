import React from 'react';

import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import {ReactComponent as Calendar} from '../../../../resources/icons/Calendar.svg';
import {ReactComponent as Eye} from '../../../../resources/icons/Eye.svg';
import {selectAppLanguage} from '../../../../store/appGlobal/selectors';
import {localeDate} from '../../../../utils/dateLocalization';
import {numericUnitNamePostfix} from '../../../../utils/numericUnitNamePostfix';

const MetaDataContainer = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 2px;
`;

const MetaDataItem = styled.div`
  display: flex;
`;

const MetaDataIcon = styled.img`
  margin-right: 2px;
`;

const MetaDataItemText = styled.span`
  width: 128px;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  color: ${(props) => props.theme.colors.realPrimary};
`;

const VerticalDelimiter = styled.div`
  height: 12px;
  width: 2px;
  background-color: ${(props) => props.theme.colors.realPrimary};
  margin-left: 10px;
  margin-right: 20px;
`;

interface MetaDataProps {
  dateCreated: string;
  views: number;
}

const MetaData = ({dateCreated, views}: MetaDataProps): JSX.Element => {
  const language = useSelector(selectAppLanguage);

  const dateCreatedLocalString = localeDate({
    creationDate: dateCreated,
    language,
    options: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  });

  const {t} = useTranslation();

  return (
    <MetaDataContainer>
      <MetaDataItem>
        <MetaDataIcon as={Calendar} />
        <MetaDataItemText>{dateCreatedLocalString}</MetaDataItemText>
      </MetaDataItem>
      <VerticalDelimiter />
      <MetaDataItem>
        <MetaDataIcon as={Eye} />
        <MetaDataItemText>
          {views +
            ' ' +
            numericUnitNamePostfix(
              views,
              t('blog.viewsNumeralDependentForms.language'),
              t('blog.viewsNumeralDependentForms.wordForms'),
            )}
        </MetaDataItemText>
      </MetaDataItem>
    </MetaDataContainer>
  );
};

export default MetaData;
