import React, {useCallback, useMemo, useState} from 'react';

import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import GenerationProcessingBlock from '../../components/GenerationProcessingBlock';
import GenerationResultBlock from '../../components/GenerationResultBlock';
import MainPagesContentContainer from '../../components/MainPagesContainer';
import CustomButton, {BUTTON_HEIGHT, CUSTOM_BUTTON_ICON_ALIGN} from '../../components/uiKit/Button';
import CheckboxInput from '../../components/uiKit/CheckboxInput';
import CustomDropdown, {DropdownOption} from '../../components/uiKit/CustomDropdown';
import CustomInput from '../../components/uiKit/Input';
import RadioGroup from '../../components/uiKit/RadioGroup';
import RangeSelect from '../../components/uiKit/RangeSelect';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import {ReactComponent as ArrowBack} from '../../resources/icons/Arrow_back.svg';

import {mockGetRandomTextUtil} from './mockText';
import jonimg from './image/jhon.jpg';
import peter from './image/peter.jpg';
import helen from './image/helen.jpg';
import kate from './image/kate.jpg';
// css
import './index.css';

const ContentContainer = styled(MainPagesContentContainer)`
  .content-container {
    overflow: auto;
  }
`;

const GenerationSetupContainer = styled.div`
  padding-top: 40px;
  width: 706px;
  display: flex;
  flex-direction: column;

  align-items: center;
  align-self: center;

  .back-to-projects-button-container {
    width: 1100px;

    &__button {
      padding: 0;

      font-size: 20px;
      font-weight: 400;
      line-height: 40px;
      letter-spacing: -0.063em;
      color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.colors.white};
    }
  }

  .radio-group {
    margin: 124px 0 30px;
  }

  .generation-description {
    line-height: 26px;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 28px;
    text-align: center;
  }

  .input-wrapper {
    height: 160px;
    margin-bottom: 64px;
  }

  .input-wrapper textarea {
    box-sizing: border-box;
  }

  .generate-button {
    filter: drop-shadow(5px 10px 10px rgba(53, 59, 206, 0.25));
  }
`;

const BackToProjectsButton = styled(CustomButton)`
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }

  &:focus {
    box-shadow: none;
  }
`;

const GenerationBottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 26px;

  .heading-text {
    line-height: 26px;
    color: ${(props) => props.theme.colors.primary};
  }

  .range-select {
    margin-bottom: 19px;
  }

  .secondary-text {
    color: ${(props) => props.theme.colors.primary};
    font-size: 10px;
    line-height: 26px;
    margin-bottom: 20px;

    &_generation-count {
      margin-bottom: 10px;
    }
  }
`;

const GenerationResultContainer = styled.div`
  max-width: 890px;
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 60px auto 0;
  padding-bottom: 60px;
  gap: 30px;
`;

const HorizontalDelimiter = styled.hr`
  min-height: 1px;
  width: 100%;
  background: #d1d1d1;
  margin: 60px 0 0;
`;

export enum GENERATION_TYPES {
  REWRITE = 'REWRITE',
  MINIMIZE_TEXT = 'MINIMIZE_TEXT',
  COPYRIGHT = 'COPYRIGHT',
}

const mockTextMoodOptions = {
  // [GENERATION_LANG_OPTIONS.RU]: {
  //   value: GENERATION_LANG_OPTIONS.RU,
  //   flag: '🇷🇺',
  //   lang: 'Русский',
  // },
  marketing: {
    value: 'marketing',
    flag: '💰',
    label: 'Marketing',
  },
  likeSource: {
    value: 'likeSource',
    flag: '🔥',
    label: 'Same as source',
  },
};

const GenerationPage = (): JSX.Element => {
  const history = useHistory();
  
  const [texts, setTexts] = useState([]);
  const [selectedGenerationType, setSelectedGenerationType] = useState(GENERATION_TYPES.REWRITE);
  const [baseText, setBaseText] = useState('This is a set of tasty products for weight loss');
  const [isGenerationsVisible, setIsGenerationsVisible] = useState(false);
  const [isProcessing, seIsProcessing] = useState(false);
  const [symbolsRange, setSymbolsRange] = useState([60, 5000]);
  const [isAutoGeneration, setIsAutoGeneration] = useState(false);

  const {workspaceId} = useParams<{workspaceId: string}>();

  const {t} = useTranslation();

  const GENERATION_MODE_OPTIONS = useMemo(
    () => [
      {label: t('generation.rewrite'), value: GENERATION_TYPES.REWRITE},
      {label: t('generation.minimizeToTheCore'), value: GENERATION_TYPES.MINIMIZE_TEXT},
      {label: t('generation.copyright'), value: GENERATION_TYPES.COPYRIGHT},
    ],
    [t],
  );

  const textMoodDropdownOptions = useMemo<Array<DropdownOption>>(() => {
    return Object.values(mockTextMoodOptions).map((item) => {
      return {
        value: item.value,
        label: item.flag + ' ' + item.label,
      };
    });
  }, []);

  const onGenerateText = useCallback(() => {
    setIsGenerationsVisible(false);
    seIsProcessing(true);
    setTimeout(() => {
      seIsProcessing(false);
      setBaseText('');
      setIsGenerationsVisible(true);
    }, 3000);
    setTexts(mockGetRandomTextUtil());
  }, []);


  const select_option_element = document.querySelector('.select_option_element');
const btn_element = document.querySelectorAll('.btn_element');
const cards_react = document.querySelectorAll('.cards_react');



btn_element.forEach((btn, index) => {
    btn?.addEventListener('click', () => {
        let el = btn.attributes['d_att_v'].value;
        select_option_element.value = el;
        cards_react.forEach((card_) => {
            card_.classList.remove('active_card_content');
        });
        cards_react[index].classList.add('active_card_content');
    });
});

select_option_element?.addEventListener('change', () => {
    let objs = select_option_element.value;

    cards_react.forEach((card_) => {
        card_.classList.remove('active_card_content');
        if (card_.getAttribute('c_r_attr_value') == objs) {
            card_.classList.add('active_card_content');
        }
    });
});

  return (
    <ContentContainer>
      <GenerationSetupContainer>
        <div className={'back-to-projects-button-container'}>
          <BackToProjectsButton
            className={'back-to-projects-button-container__button'}
            title={t('generation.backToProjects')}
            icon={ArrowBack}
            iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
            buttonHeight={BUTTON_HEIGHT.THIN}
            onClick={() => history.push('/workspaces/' + workspaceId)}
          />
        </div>
        <div className="cards_react-item-wrapper">
        <div className="inner-cards_react-item-wrapper">
            <div className="cards_react-content-image">
                <div className="cards_react active_card_content" c_r_attr_value="John">
                    <div className="images_c img1">
                        <div className="_text_name">
                            <h1>John</h1>
                            <p>Harvard science</p>
                        </div>
                        <img src={jonimg} />
                    </div>
                    <div className="cards_react-body">
                        <p>
                            Writes complex scientific texts,
                            TOR and articles. <span>Apply for:
                                writing TORs, scientific articles,
                                technical descriptions.</span>
                        </p>
                        <button className="btn_element ffdf" d_att_v="John">
                            Choose
                            <span> <svg width="14" height="14" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M7 13.9999L5.75312 12.7749L10.6531 7.87498H0L0 6.125H10.6531L5.75312 1.22505L7 6.10352e-05L14 6.99999L7 13.9999Z"/>
</svg></span>
                        </button>
                    </div>
                </div>
                <div className="cards_react" c_r_attr_value="Peter">
                    <div className="images_c img2">
                        <div className="_text_name">
                            <h1>Peter</h1>
                            <p>Google Marketer</p>
                        </div>
                        <img  src={peter} />
                    </div>
                    <div className="cards_react-body">
                        <p>
                            Writes the most selling text
                            on the market in seconds.
                            <span>Apply for: marketing texts,
                                posts.</span>
                        </p>
                        <button className="btn_element" d_att_v="Peter">
                            Choose
                            <span> <svg width="14" height="14" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M7 13.9999L5.75312 12.7749L10.6531 7.87498H0L0 6.125H10.6531L5.75312 1.22505L7 6.10352e-05L14 6.99999L7 13.9999Z"/>
</svg></span>
                        </button>
                    </div>
                </div>
                <div className="cards_react" c_r_attr_value="Kate">
                    <div className="images_c img3">
                        <div className="_text_name">
                            <h1>Kate</h1>
                            <p>London schoolgirl</p>
                        </div>
                        <img  src={kate} />
                    </div>
                    <div className="cards_react-body">
                        <p>
                            Writes the most selling text
                            on the market in seconds.
                            <span>Apply for: marketing texts,
                                posts.</span>
                        </p>
                        <button className="btn_element" d_att_v="Kate">
                            Choose
                            <span> <svg width="14" height="14" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M7 13.9999L5.75312 12.7749L10.6531 7.87498H0L0 6.125H10.6531L5.75312 1.22505L7 6.10352e-05L14 6.99999L7 13.9999Z"/>
</svg></span>
                        </button>
                    </div>
                </div>
                <div className="cards_react" c_r_attr_value="Helen">
                    <div className="images_c img4">
                        <div className="_text_name">
                            <h1>Helen</h1>
                            <p>Forbes Journalist</p>
                        </div>
                        <img  src={helen} />
                    </div>
                    <div className="cards_react-body">
                        <p>
                            Knows how to write an article for a billion views. <span>Apply for: articles, headlines for
                                articles.</span>
                        </p>
                        <button className="btn_element" d_att_v="Helen">
                            Choose
                            <span> <svg width="14" height="14" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M7 13.9999L5.75312 12.7749L10.6531 7.87498H0L0 6.125H10.6531L5.75312 1.22505L7 6.10352e-05L14 6.99999L7 13.9999Z"/>
</svg></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
          </div>
        <RadioGroup
          className={'radio-group'}
          options={GENERATION_MODE_OPTIONS}
          selectedOptionValue={selectedGenerationType}
          onSelectOption={(index) =>
            setSelectedGenerationType(GENERATION_MODE_OPTIONS[index].value)
          }
        />
        <TextBlock className={'generation-description'} type={TEXT_BLOCK_TYPE.P5}>
          {t('generation.generatorDescription')}
        </TextBlock>
        <CustomInput
          placeholder={t('generation.yourText')}
          name={'baseText'}
          isMultiline={true}
          value={baseText}
          limitCount={5000}
          isInputLimited={true}
          onChange={(e) => setBaseText(e.target.value)}
        />
        <GenerationBottomControls>
          <div>
            <TextBlock className={'heading-text'} type={TEXT_BLOCK_TYPE.P5}>
              {t('generation.chooseTextTone')}
            </TextBlock>
            <TextBlock className={'secondary-text'} type={TEXT_BLOCK_TYPE.P5}>
              {t('generation.textChooseSubHeader')}
            </TextBlock>
            <CustomDropdown
              options={textMoodDropdownOptions}
              selectedOption={textMoodDropdownOptions[0]}
              onSelect={_.noop}
            />
             <select className="select_option_element">
                <option value="John" selected>John</option>
                <option value="Peter">Peter</option>
                <option value="Kate">Kate</option>
                <option value="Helen">Helen</option>
            </select> 
          </div>
          <div>
            <TextBlock className={'heading-text'} type={TEXT_BLOCK_TYPE.P5}>
              {t('generation.generationSymbolsCount')}
            </TextBlock>
            <TextBlock
              className={'secondary-text secondary-text_generation-count'}
              type={TEXT_BLOCK_TYPE.P5}>
              {t('generation.generationSymbolsCountSubheader')}
            </TextBlock>
            <RangeSelect
              disabled={isAutoGeneration}
              className={'range-select'}
              onChange={(value) => setSymbolsRange(value)}
              values={symbolsRange}
              step={1}
              minNumber={60}
              maxNumber={5000}
            />
            <CheckboxInput
              checked={isAutoGeneration}
              onChange={(e) => setIsAutoGeneration(e.target.checked)}
              label={t('generation.autoSymbolsCountCalculate')}
            />
          </div>
        </GenerationBottomControls>
        <CustomButton
          className={'generate-button'}
          title={t('generation.generateText')}
          onClick={onGenerateText}
        />
      </GenerationSetupContainer>

      {(isGenerationsVisible || isProcessing) && <HorizontalDelimiter />}

      {isProcessing && <GenerationProcessingBlock />}

      {isGenerationsVisible && (
        <GenerationResultContainer>
          {texts?.length > 0 && texts?.map((text) => <GenerationResultBlock text={text} />)}
        </GenerationResultContainer>
      )}
    </ContentContainer>
  );
};

export default GenerationPage;
