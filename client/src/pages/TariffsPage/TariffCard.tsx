import React, {useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {TARIFFS} from '../../constants/values';

import ButtonFloatingBackground from '../../components/uiKit/Button/ButtonFloatingBackground';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import {ReactComponent as FeatureCheckmarkIcon} from '../../resources/icons/Checkmark_blue.svg';
import {ReactComponent as FeatureCheckmarkIconWhite} from '../../resources/icons/Checkmark_white.svg';
import TariffCardBg from '../../resources/images/Tariff_card_bg.png';

interface CardWrapperProps {
  isPopular: boolean;
  bgColor?: string;
}

const CardWrapper = styled.div<CardWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 174px;
  height: ${(props) => (props.isPopular ? 358 : 323)}px;
  ${(props) => (props.isPopular ? 'margin-top: -50px' : '')};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 8px 16px 10px;
  background-color: ${(props) => props.bgColor || props.theme.colors.white};
  ${(props) =>
    props.isPopular
      ? `
    background-image: url(${TariffCardBg});
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
  `
      : ''}
`;

const Header = styled.div<{textColor?: string; smallMargin: boolean}>`
  min-height: 40px;

  .price {
    font-style: italic;
    line-height: 26px;
    ${(props) => (props.textColor ? 'color: ' + props.textColor : '')}
  }
  .price-suffix {
    margin-left: ${(props) => (props.smallMargin ? 1 : 6)}px;
    font-size: 8px;
    font-weight: 700;
    color: ${(props) => props.textColor || props.theme.colors.blueishGrey55};
  }
  .price-alt {
    margin-top: 2px;
    font-size: 8px;
    font-weight: 500;
    color: ${(props) => props.textColor || props.theme.colors.blueishGrey55};
    line-height: 12px;
  }
`;

const PopularBadge = styled.div`
  align-self: flex-end;
  background-color: #001480;
  border-radius: 10px;
  font-size: 6px;
  font-weight: 400;
  text-transform: uppercase;
  color: white;
  padding: 4px 10px;
`;

const Title = styled.div<{textColor?: string}>`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  font-style: italic;
  color: ${(props) => props.textColor || props.theme.colors.btnPrimary}; // todo
`;

const Description = styled.div<{textColor?: string}>`
  margin-top: 6px;
  font-size: 9px;
  font-weight: 500;
  color: ${(props) => props.textColor || props.theme.colors.blueishGrey55};
  line-height: 11px;
  height: 38px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Feature = styled.div<{textColor: string}>`
  font-size: 10px;
  font-weight: 500;
  display: flex;
  color: ${(props) => props.textColor || props.theme.colors.blueishGrey55};
`;

const FeatureCheckmark = styled.img<{$checkmarkColor: string}>`
  height: 12px;
  width: 12px;
  min-width: 12px;
  margin-right: 10px;
  color: ${(props) => props.$checkmarkColor || '#E6E6E6'};
`;

const ActionButton = styled(ButtonFloatingBackground)`
  margin-top: auto;
  padding: 10px 10px;
  margin-right: 2px;
`;

interface TariffCardProps {
  priceText: string;
  priceSuffix: string;
  priceAltText: string;
  tariffName: string | keyof typeof TARIFFS;
  tariffDescription: string;
  tariffFeatures: string[];
  actionButtonTitle: string;
  onActionButtonClick: () => void;
  isPopular: boolean;
  bgColor?: string;
  textColor?: string;
  checkmarkColor?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  buttonTextColor?: string;
  buttonHoverTextColor?: string;
  whiteCheckmark?: boolean;
}

const TariffCard = ({
  priceText,
  priceSuffix,
  priceAltText,
  tariffName,
  tariffDescription,
  tariffFeatures,
  actionButtonTitle,
  onActionButtonClick,
  isPopular,
  bgColor,
  textColor,
  checkmarkColor,
  buttonBgColor,
  buttonHoverBgColor,
  buttonTextColor,
  buttonHoverTextColor,
  whiteCheckmark = false,
}: TariffCardProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <CardWrapper isPopular={isPopular} bgColor={bgColor}>
      {isPopular && <PopularBadge>{t('tariffs.popularLabel')}</PopularBadge>}
      <Header
        textColor={textColor}
        smallMargin={priceText.split('.')[0].length >= 4 && priceSuffix.length > 15}>
        <div>
          <TextBlock as={'span'} className={'price'} type={TEXT_BLOCK_TYPE.P1}>
            {priceText.split('.')[0]}
          </TextBlock>
          <span className={'price-suffix'}>{priceSuffix}</span>
        </div>
        <div className={'price-alt'}>{priceAltText}</div>
      </Header>
      <Title textColor={textColor}>{tariffName}</Title>
      <Description textColor={textColor}>{tariffDescription}</Description>
      <FeatureList>
        {tariffFeatures.map((feature) => (
          <Feature textColor={textColor} key={feature}>
            <FeatureCheckmark
              $checkmarkColor={checkmarkColor}
              as={whiteCheckmark ? FeatureCheckmarkIconWhite : FeatureCheckmarkIcon}
            />
            <div>{feature}</div>
          </Feature>
        ))}
      </FeatureList>
      <ActionButton
        title={actionButtonTitle}
        bgColor={buttonBgColor}
        blobsColor={buttonHoverBgColor}
        textColorNormal={buttonTextColor}
        textColorHover={buttonHoverTextColor}
        onClick={onActionButtonClick}
      />
    </CardWrapper>
  );
};

export default TariffCard;
