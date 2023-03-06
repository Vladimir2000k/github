import React, {useEffect, useMemo, useState} from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {TARIFFS} from '../../../constants/values';

import {TARIFF_DISPLAY_TYPES} from '../../../pages/TariffsPage';
import CustomButton from '../../uiKit/Button';
import RadioGroup from '../../uiKit/RadioGroup';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../uiKit/TextBlock';
import Modal from '../common';

import StrikethroughText from './components/StrikethroughText';

const TariffModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px 20px 30px 34px;
  border-radius: 10px;
`;

const TariffModalHeadingText = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: 700;
  line-height: 33px;
  color: ${(props) => props.theme.colors.grey20};
  text-align: center;
  white-space: pre-line;
`;

const TariffModalLeadText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.grey20};
`;

const TariffModalSavingText = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  white-space: pre-line;
  color: ${(props) => props.theme.colors.realPrimary};
`;

const TariffModalSpecificBlueSpan = styled.span`
  font-size: 25px;
  font-weight: 700;
`;

const TariffModalMonthlyPriceForYearBlock = styled.div`
  width: 100%;
  min-height: 46px;
  padding-left: 4px;

  .price {
    font-size: 30px;
    font-weight: 700;
    line-height: 46px;
    color: #231d4f;
  }
  .price-suffix {
    margin-left: 6px;
    font-size: 8px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.blueishGrey55};
  }
`;

const TariffModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  width: 333px;
`;

const TariffModalToPayContainer = styled.div`
  flex: 1;
  margin-bottom: 1px;
`;

const TariffModalToPayText = styled(TextBlock)`
  line-height: 20px;
  color: ${(props) => props.theme.colors.blueishGrey55};
`;

const TariffModalToPayPrice = styled.div`
  width: 100%;
  min-height: 40px;
  margin-top: 4px;

  .price {
    font-size: 30px;
    font-weight: 700;
    line-height: 32px;
    color: #231d4f;
  }
  .price-suffix {
    margin-left: 6px;
    font-size: 8px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.blueishGrey55};
  }
`;

const TariffModalActionButton = styled(CustomButton)`
  width: 188px;
`;

interface TariffModalProps {
  tariffName: TARIFFS;
  monthlyPriceForYear: string;
  monthlyPriceForMonth: string;
  isVisible: boolean;
  onActionButtonClick: () => void;
  onCancelClick: () => void;
}

const TariffModal = ({
  tariffName,
  monthlyPriceForYear,
  monthlyPriceForMonth,
  isVisible,
  onActionButtonClick,
  onCancelClick,
}: TariffModalProps): JSX.Element => {
  const [yearlyDisplayOption, setYearlyDisplayOption] = useState(TARIFF_DISPLAY_TYPES.MONTH);

  const {t} = useTranslation();

  const {saving, toPayMonthlyForYear, toPayYearlyForYear, toPayForMonth} = useMemo(() => {
    return {
      saving: String(Number(monthlyPriceForMonth) * 12 - Number(monthlyPriceForYear) * 12),
      toPayMonthlyForYear: String(Number(monthlyPriceForMonth) * 12),
      toPayYearlyForYear: String(Number(monthlyPriceForYear) * 12),
      toPayForMonth: String(Number(monthlyPriceForMonth)),
    };
  }, [monthlyPriceForMonth, monthlyPriceForYear]);

  const headingTextLocalizationPath = useMemo(
    () =>
      yearlyDisplayOption === TARIFF_DISPLAY_TYPES.MONTH
        ? 'tariffs.modal.monthlySubscription'
        : 'tariffs.modal.yearlySubscription',
    [yearlyDisplayOption],
  );

  const YEAR_DISPLAY_OPTIONS = useMemo(
    () => [
      {label: t('tariffs.modal.month'), value: TARIFF_DISPLAY_TYPES.MONTH},
      {label: t('tariffs.modal.year'), value: TARIFF_DISPLAY_TYPES.YEAR},
    ],
    [t],
  );

  const toPayPeriodLocalizationPath = useMemo(() => {
    return yearlyDisplayOption === TARIFF_DISPLAY_TYPES.YEAR
      ? 'tariffs.modal.forYear'
      : 'tariffs.modal.forMonth';
  }, [yearlyDisplayOption]);

  useEffect(() => {
    setYearlyDisplayOption(TARIFF_DISPLAY_TYPES.MONTH);
  }, [isVisible]);

  return (
    <Modal isModalVisible={isVisible} onClick={onCancelClick}>
      <TariffModalContentContainer>
        {isVisible && (
          <RadioGroup
            className={'tariff-modal-radio-switch'}
            selectedOptionValue={yearlyDisplayOption}
            onSelectOption={(index) => setYearlyDisplayOption(YEAR_DISPLAY_OPTIONS[index].value)}
            options={YEAR_DISPLAY_OPTIONS}
          />
        )}
        <TariffModalHeadingText>
          {t(headingTextLocalizationPath) + '\n' + t('tariffs.modal.tariffPlan') + ' ' + tariffName}
        </TariffModalHeadingText>
        <TariffModalLeadText type={TEXT_BLOCK_TYPE.P7}>
          {t('tariffs.modal.startWorkingRightNow')}
        </TariffModalLeadText>
        <TariffModalSavingText>
          {t('tariffs.modal.saving')}{' '}
          <TariffModalSpecificBlueSpan>${saving}</TariffModalSpecificBlueSpan>
          {'\n'}
          {t('tariffs.modal.bayingYearlySubscription')}
        </TariffModalSavingText>
        <TariffModalMonthlyPriceForYearBlock>
          {yearlyDisplayOption === TARIFF_DISPLAY_TYPES.YEAR && (
            <div>
              <StrikethroughText className="price">
                ${String(Number(toPayMonthlyForYear))}
              </StrikethroughText>
              <span className="price-suffix">/ {t('tariffs.modal.toPayMonthlyForYear')}</span>
            </div>
          )}
        </TariffModalMonthlyPriceForYearBlock>
        <TariffModalFooter>
          <TariffModalToPayContainer>
            <TariffModalToPayText type={TEXT_BLOCK_TYPE.P6}>
              {t('tariffs.modal.toPay')}:
            </TariffModalToPayText>
            <TariffModalToPayPrice>
              <span className="price">
                $
                {yearlyDisplayOption === TARIFF_DISPLAY_TYPES.YEAR
                  ? toPayYearlyForYear
                  : toPayForMonth}
              </span>
              <span className="price-suffix">/ {t(toPayPeriodLocalizationPath)}</span>
            </TariffModalToPayPrice>
          </TariffModalToPayContainer>
          <TariffModalActionButton
            title={t('tariffs.modal.buttonText')}
            onClick={onActionButtonClick}
          />
        </TariffModalFooter>
      </TariffModalContentContainer>
    </Modal>
  );
};

export default TariffModal;
