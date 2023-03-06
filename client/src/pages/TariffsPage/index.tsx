import React, {useCallback, useEffect, useMemo, useState} from 'react';

import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {TARIFFS} from '../../constants/values';

import Footer from '../../components/Footer';
import Header from '../../components/LandingHeader';
import LandingPagesContainer from '../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../components/LandingPagesContentContainer';
import TariffModal from '../../components/modals/TariffModal';
import RadioGroup from '../../components/uiKit/RadioGroup';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import {TariffsActions} from '../../store/common/reducerActions';
import {TariffsSagaActions} from '../../store/common/sagaActions';
import {selectTariffs} from '../../store/tariffs/selectors';
import {numericUnitNamePostfix} from '../../utils/numericUnitNamePostfix';
import {removeTrailingZeros} from '../../utils/removeTrailingZeros';

import TariffCard from './TariffCard';

const Heading = styled(TextBlock)`
  margin-top: 53px;
  text-align: center;
`;

const Lead = styled(TextBlock)`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.blueishGrey55};
  font-size: 16px;
  text-align: center;
`;

const TariffRadioSwitch = styled(RadioGroup)`
  margin: 20px auto 30px;
`;

const TariffsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PersonalTariffsBlock = styled.div`
  width: 704px;
  height: 362px;

  background-color: ${(props) => props.theme.colors.violet};
  border-radius: 20px;

  .block-heading {
    color: ${(props) => props.theme.colors.realPrimary}; // TODO update after merge
    margin: 10px 0 0 29px;
  }

  .block-underlay {
    width: calc(100% + 11px);
    margin: 14px 0 0 -11px;
  }
`;

const BusinessTariffsBlock = styled.div`
  width: 355px;
  height: 362px;

  background-color: ${(props) => props.theme.colors.secondaryPale};
  border-radius: 20px;

  .block-heading {
    color: ${(props) => props.theme.colors.realPrimary}; // TODO update after merge
    margin: 10px 21px 0 0;
    text-align: end;
  }

  .block-underlay {
    width: calc(100% + 11px);
    margin: 14px -11px 0 0;
  }
`;

const BlockUnderlay = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  box-shadow: -4px 4px 30px rgba(11, 0, 140, 0.1);
  height: 338px;
  padding: 10px 5px 5px 10px;
  box-sizing: border-box;
  display: flex;
`;

enum PRICE_PROPERTY_KEYS {
  MONTHLY_PRICE_FOR_MONTH = 'monthlyPriceForMonth',
  MONTHLY_PRICE_FOR_YEAR = 'monthlyPriceForYear',
  PRICE_OF_ADDITIONAL_PER_MONTH = 'priceOfAdditionalForMonth',
  PRICE_OF_ADDITIONAL_PER_YEAR = 'priceOfAdditionalForYear',
}

export enum TARIFF_DISPLAY_TYPES {
  YEAR = 'YEAR',
  MONTH = 'MONTH',
}

const TariffsPage = (): JSX.Element => {
  const [yearlyDisplayOption, setYearlyDisplayOption] = useState(TARIFF_DISPLAY_TYPES.MONTH);
  const [modalData, setModalData] = useState<{
    tariffName: TARIFFS;
    monthlyPriceForMonth: string;
    monthlyPriceForYear: string;
    yearlyDisplayOption: TARIFF_DISPLAY_TYPES;
    isVisible: boolean;
  }>({
    tariffName: TARIFFS.INTRO,
    monthlyPriceForMonth: '0',
    monthlyPriceForYear: '0',
    yearlyDisplayOption: TARIFF_DISPLAY_TYPES.MONTH,
    isVisible: false,
  });

  const tariffs = useSelector(selectTariffs);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(TariffsSagaActions.getTariffs());
    return () => {
      dispatch(TariffsActions.clearTariffsPageData());
    };
  }, [dispatch]);

  const yearlyDisplay = yearlyDisplayOption === TARIFF_DISPLAY_TYPES.YEAR;

  const subscriptionPeriodPricePerMonthSuffixLocalizationPath = useMemo(() => {
    return yearlyDisplay ? 'tariffs.perYear' : 'tariffs.perMonth';
  }, [yearlyDisplay]);

  const {
    introPrice,
    litePrice,
    starterPrice,
    proPrice,
    teamsPrice,
    liteAdditionalPrice,
    starterAdditionalPrice,
    proAdditionalPrice,
    teamsAdditionalPrice,
  } = useMemo(() => {
    const priceKey = yearlyDisplay
      ? PRICE_PROPERTY_KEYS.MONTHLY_PRICE_FOR_YEAR
      : PRICE_PROPERTY_KEYS.MONTHLY_PRICE_FOR_MONTH;

    const additionalPriceKey = yearlyDisplay
      ? PRICE_PROPERTY_KEYS.PRICE_OF_ADDITIONAL_PER_YEAR
      : PRICE_PROPERTY_KEYS.PRICE_OF_ADDITIONAL_PER_MONTH;

    if (tariffs !== undefined) {
      return {
        introPrice: t('tariffs.forFree'),
        litePrice: removeTrailingZeros(tariffs[TARIFFS.LITE][priceKey]),
        starterPrice: removeTrailingZeros(tariffs[TARIFFS.STARTER][priceKey]),
        proPrice: removeTrailingZeros(tariffs[TARIFFS.PRO][priceKey]),
        teamsPrice: removeTrailingZeros(tariffs[TARIFFS.TEAMS][priceKey]),

        liteAdditionalPrice: removeTrailingZeros(tariffs[TARIFFS.LITE][additionalPriceKey]),
        starterAdditionalPrice: removeTrailingZeros(
          tariffs[TARIFFS.STARTER][additionalPriceKey],
        ),
        proAdditionalPrice: removeTrailingZeros(tariffs[TARIFFS.PRO][additionalPriceKey]),
        teamsAdditionalPrice: removeTrailingZeros(tariffs[TARIFFS.TEAMS][additionalPriceKey]),
      };
    } else {
      return {
        introPrice: null,
        litePrice: null,
        starterPrice: null,
        proPrice: null,
        teamsPrice: null,

        liteAdditionalPrice: null,
        starterAdditionalPrice: null,
        proAdditionalPrice: null,
        teamsAdditionalPrice: null,
      };
    }
  }, [t, tariffs, yearlyDisplay]);

  const YEAR_DISPLAY_OPTIONS = useMemo(
    () => [
      {label: t('tariffs.monthly'), value: TARIFF_DISPLAY_TYPES.MONTH},
      {label: t('tariffs.yearly'), value: TARIFF_DISPLAY_TYPES.YEAR},
    ],
    [t],
  );

  const onToggleModal = useCallback(() => {
    if (modalData.isVisible) {
      setModalData(
        Object.assign({}, modalData, {
          isVisible: false,
        }),
      );
    } else {
      setModalData(
        Object.assign({}, modalData, {
          isVisible: true,
        }),
      );
    }
  }, [modalData]);

  const onTariffActionButtonClick = useCallback(
    (tariffName: TARIFFS) => {
      if (yearlyDisplayOption === TARIFF_DISPLAY_TYPES.MONTH) {
        setModalData({
          tariffName: tariffs[tariffName].type,
          monthlyPriceForMonth: tariffs[tariffName].monthlyPriceForMonth,
          monthlyPriceForYear: tariffs[tariffName].monthlyPriceForYear,
          yearlyDisplayOption: TARIFF_DISPLAY_TYPES.MONTH,
          isVisible: true,
        });
      } else {
        alert('Payment section is under construction');
      }
    },
    [tariffs, yearlyDisplayOption],
  );

  const onTariffModalActionButtonClick = useCallback(() => {
    alert('Payment section is under construction');
  }, []);

  return (
    <LandingPagesContainer>
      <TariffModal
        tariffName={modalData.tariffName}
        monthlyPriceForMonth={modalData.monthlyPriceForMonth}
        monthlyPriceForYear={modalData.monthlyPriceForYear}
        isVisible={modalData.isVisible}
        onActionButtonClick={onTariffModalActionButtonClick}
        onCancelClick={onToggleModal}
      />
      <Header />
      <LandingPagesContentContainer>
        <Heading type={TEXT_BLOCK_TYPE.H1}>{t('tariffs.heading')}</Heading>
        <Lead type={TEXT_BLOCK_TYPE.P4}>{t('tariffs.lead')}</Lead>
        {tariffs !== undefined && (
          <div>
            <TariffRadioSwitch
              className={'tariff-radio-switch'}
              selectedOptionValue={yearlyDisplayOption}
              onSelectOption={(index) => setYearlyDisplayOption(YEAR_DISPLAY_OPTIONS[index].value)}
              options={YEAR_DISPLAY_OPTIONS}
            />
            <TariffsWrapper>
              <PersonalTariffsBlock>
                <TextBlock type={TEXT_BLOCK_TYPE.P1} className={'block-heading'}>
                  {t('tariffs.personal')}
                </TextBlock>
                <BlockUnderlay className={'block-underlay'}>
                  <TariffCard
                    priceText={introPrice}
                    priceSuffix={''}
                    priceAltText={''}
                    tariffName={'Intro'}
                    tariffDescription={t('tariffs.introTariffDescription')}
                    actionButtonTitle={t('tariffs.tryForFree')}
                    tariffFeatures={[
                      `${tariffs[TARIFFS.INTRO].creditsPerMonth} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.INTRO].creditsPerMonth,
                        t('tariffs.creditsPerMonthNumeralDependentForms.language'),
                        t('tariffs.creditsPerMonthNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atMonth')}`,
                      `${tariffs[TARIFFS.INTRO].languages} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.INTRO].languages,
                        t('tariffs.languagesNumeralDependentForms.language'),
                        t('tariffs.languagesNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.INTRO].antiPlagiarismChecks} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.INTRO].antiPlagiarismChecks,
                        t('tariffs.antiPlagiarismChecksNumeralDependentForms.language'),
                        t('tariffs.antiPlagiarismChecksNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.antiPlagiarism')}`,
                      `${tariffs[TARIFFS.INTRO].maxProjects} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.INTRO].maxProjects,
                        t('tariffs.maxProjectsNumeralDependentForms.language'),
                        t('tariffs.maxProjectsNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.INTRO].maxWorkspaces} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.INTRO].maxWorkspaces,
                        t('tariffs.maxWorkspacesNumeralDependentForms.language'),
                        t('tariffs.maxWorkspacesNumeralDependentForms.wordForms'),
                      )}`,
                    ]}
                    isPopular={false}
                    onActionButtonClick={_.noop}
                  />
                  <TariffCard
                    priceText={'$' + litePrice}
                    priceSuffix={'/ ' + t(subscriptionPeriodPricePerMonthSuffixLocalizationPath)}
                    priceAltText={`$${liteAdditionalPrice} ${t('tariffs.perGeneration')}`}
                    tariffName={'Lite'}
                    tariffDescription={t('tariffs.liteTariffDescription')}
                    actionButtonTitle={t('tariffs.selectPlan')}
                    tariffFeatures={[
                      `${tariffs[TARIFFS.LITE].creditsPerMonth} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.LITE].creditsPerMonth,
                        t('tariffs.creditsPerMonthNumeralDependentForms.language'),
                        t('tariffs.creditsPerMonthNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atMonth')}`,
                      `${tariffs[TARIFFS.LITE].languages} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.LITE].languages,
                        t('tariffs.languagesNumeralDependentForms.language'),
                        t('tariffs.languagesNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.LITE].initialBonusCredits} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.LITE].initialBonusCredits,
                        t('tariffs.initialBonusCreditsNumeralDependentForms.language'),
                        t('tariffs.initialBonusCreditsNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atFirstMonth')}`,
                      `${tariffs[TARIFFS.LITE].antiPlagiarismChecks} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.LITE].antiPlagiarismChecks,
                        t('tariffs.antiPlagiarismChecksNumeralDependentForms.language'),
                        t('tariffs.antiPlagiarismChecksNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.antiPlagiarism')}`,
                      `${tariffs[TARIFFS.LITE].maxProjects} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.LITE].maxProjects,
                        t('tariffs.maxProjectsNumeralDependentForms.language'),
                        t('tariffs.maxProjectsNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.LITE].maxWorkspaces} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.LITE].maxWorkspaces,
                        t('tariffs.maxWorkspacesNumeralDependentForms.language'),
                        t('tariffs.maxWorkspacesNumeralDependentForms.wordForms'),
                      )}`,
                    ]}
                    isPopular={false}
                    onActionButtonClick={() => onTariffActionButtonClick(TARIFFS.LITE)}
                  />
                  <TariffCard
                    priceText={'$' + starterPrice}
                    priceSuffix={'/ ' + t(subscriptionPeriodPricePerMonthSuffixLocalizationPath)}
                    priceAltText={`$${starterAdditionalPrice} ${t('tariffs.perGeneration')}`}
                    tariffName={'Starter'}
                    tariffDescription={t('tariffs.starterTariffDescription')}
                    actionButtonTitle={t('tariffs.selectPlan')}
                    tariffFeatures={[
                      `${tariffs[TARIFFS.STARTER].creditsPerMonth} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.STARTER].creditsPerMonth,
                        t('tariffs.creditsPerMonthNumeralDependentForms.language'),
                        t('tariffs.creditsPerMonthNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atMonth')}`,
                      `${tariffs[TARIFFS.STARTER].languages} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.STARTER].languages,
                        t('tariffs.languagesNumeralDependentForms.language'),
                        t('tariffs.languagesNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.STARTER].initialBonusCredits} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.STARTER].initialBonusCredits,
                        t('tariffs.initialBonusCreditsNumeralDependentForms.language'),
                        t('tariffs.initialBonusCreditsNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atFirstMonth')}`,
                      `${tariffs[TARIFFS.STARTER].antiPlagiarismChecks} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.STARTER].antiPlagiarismChecks,
                        t('tariffs.antiPlagiarismChecksNumeralDependentForms.language'),
                        t('tariffs.antiPlagiarismChecksNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.antiPlagiarism')}`,
                      `${tariffs[TARIFFS.STARTER].maxProjects} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.STARTER].maxProjects,
                        t('tariffs.maxProjectsNumeralDependentForms.language'),
                        t('tariffs.maxProjectsNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.STARTER].maxWorkspaces} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.STARTER].maxWorkspaces,
                        t('tariffs.maxWorkspacesNumeralDependentForms.language'),
                        t('tariffs.maxWorkspacesNumeralDependentForms.wordForms'),
                      )}`,
                    ]}
                    isPopular={false}
                    onActionButtonClick={() => onTariffActionButtonClick(TARIFFS.STARTER)}
                  />
                  <TariffCard
                    priceText={'$' + proPrice}
                    priceSuffix={'/ ' + t(subscriptionPeriodPricePerMonthSuffixLocalizationPath)}
                    priceAltText={`$${proAdditionalPrice} ${t('tariffs.perGeneration')}`}
                    tariffName={'Pro'}
                    tariffDescription={t('tariffs.proTariffDescription')}
                    actionButtonTitle={t('tariffs.selectPlan')}
                    tariffFeatures={[
                      `${tariffs[TARIFFS.PRO].creditsPerMonth} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.PRO].creditsPerMonth,
                        t('tariffs.initialBonusCreditsNumeralDependentForms.language'),
                        t('tariffs.initialBonusCreditsNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atMonth')}`,
                      `${tariffs[TARIFFS.PRO].languages} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.PRO].languages,
                        t('tariffs.languagesNumeralDependentForms.language'),
                        t('tariffs.languagesNumeralDependentForms.wordForms'),
                      )}`,
                      `${tariffs[TARIFFS.PRO].initialBonusCredits} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.PRO].initialBonusCredits,
                        t('tariffs.initialBonusCreditsNumeralDependentForms.language'),
                        t('tariffs.initialBonusCreditsNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atFirstMonth')}`,
                      t('tariffs.unlimitedAntiPlagiarism'),
                      t('tariffs.unlimitedProjects'),
                      t('tariffs.unlimitedWorkspaces'),
                    ]}
                    isPopular={true}
                    bgColor={'#353bce'}
                    textColor={'#fff'}
                    checkmarkColor={'#00D1FF'}
                    buttonBgColor={'#00D1FF'}
                    buttonTextColor={'#FFF'}
                    buttonHoverBgColor={'#FFF'}
                    buttonHoverTextColor={'#353bce'}
                    whiteCheckmark={true}
                    onActionButtonClick={() => onTariffActionButtonClick(TARIFFS.PRO)}
                  />
                </BlockUnderlay>
              </PersonalTariffsBlock>
              <BusinessTariffsBlock>
                <TextBlock type={TEXT_BLOCK_TYPE.P1} className={'block-heading'}>
                  {t('tariffs.forBusiness')}
                </TextBlock>
                <BlockUnderlay className={'block-underlay'}>
                  <TariffCard
                    priceText={'$' + teamsPrice}
                    priceSuffix={'/ ' + t(subscriptionPeriodPricePerMonthSuffixLocalizationPath)}
                    priceAltText={`$${teamsAdditionalPrice} ${t('tariffs.perGeneration')}`}
                    tariffName={'Teams'}
                    tariffDescription={t('tariffs.teamTariffDescription')}
                    actionButtonTitle={t('tariffs.selectPlan')}
                    tariffFeatures={[
                      `${tariffs[TARIFFS.TEAMS].creditsPerMonth} ${numericUnitNamePostfix(
                        tariffs[TARIFFS.TEAMS].creditsPerMonth,
                        t('tariffs.initialBonusCreditsNumeralDependentForms.language'),
                        t('tariffs.initialBonusCreditsNumeralDependentForms.wordForms'),
                      )} ${t('tariffs.atMonth')}`,
                      t('tariffs.unlimitedAntiPlagiarism'),
                      t('tariffs.unlimitedProjects'),
                      t('tariffs.collaborateOnFilesAndProjects'),
                    ]}
                    isPopular={true}
                    bgColor={'#00D1FF'}
                    textColor={'#000005'}
                    checkmarkColor={'#fff'}
                    buttonBgColor={'#fff'}
                    buttonTextColor={'#353BCE'}
                    onActionButtonClick={() => onTariffActionButtonClick(TARIFFS.TEAMS)}
                  />
                  <TariffCard
                    priceText={'$ individual'}
                    priceSuffix={'/ ' + t('tariffs.perMonth')}
                    priceAltText={''}
                    tariffName={'API integration'}
                    tariffDescription={t('tariffs.apiTariffDescription')}
                    actionButtonTitle={t('tariffs.requestPrice')}
                    onActionButtonClick={() => history.push('/api-integration-request')}
                    tariffFeatures={[
                      t('tariffs.individualCPA'),
                      `24 ${numericUnitNamePostfix(
                        24,
                        t('tariffs.languagesNumeralDependentForms.language'),
                        t('tariffs.languagesNumeralDependentForms.wordForms'),
                      )}`,
                      t('tariffs.personalAPI'),
                    ]}
                    isPopular={false}
                    buttonBgColor={'#E4FBFE'}
                    buttonTextColor={'#353BCE'}
                    buttonHoverBgColor={'#00D1FF'}
                    buttonHoverTextColor={'#FFF'}
                  />
                </BlockUnderlay>
              </BusinessTariffsBlock>
            </TariffsWrapper>
          </div>
        )}
      </LandingPagesContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default TariffsPage;
