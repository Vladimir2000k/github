import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {ReactComponent as CopyIcon} from '../../resources/icons/Generation_result_copy.svg';
import {ReactComponent as DeleteIcon} from '../../resources/icons/Generation_result_delete.svg';
import {ReactComponent as MoreSimilarIcon} from '../../resources/icons/Generation_result_more_similar.svg';
import {ReactComponent as PlagiarismIcon} from '../../resources/icons/Generation_result_plagiarism.svg';
import {ReactComponent as SaveIcon} from '../../resources/icons/Generation_result_save.svg';
import CustomButton, {BUTTON_HEIGHT, CUSTOM_BUTTON_ICON_ALIGN} from '../uiKit/Button';

const GenerationBlockContainer = styled.div`
  .content {
    padding: 12px 16px;
    border-radius: 10px;
    border-width: 0;
    background: ${({theme}) => theme.colors.blueishGray};

    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.006em;
    color: #252c32;
  }

  .control-buttons-wrapper {
    display: flex;
    gap: 20px;
    margin-top: 18px;

    .control-button {
      height: 38px;
      padding: 7px 14px;
      background: ${({theme}) => theme.colors.secondaryPale};

      font-size: 10px;
      font-weight: 500;
      line-height: 13px;
      color: ${({theme}) => theme.colors.btnPrimary};

      .button__icon-container {
        margin-right: 10px;
      }
    }
  }
`;

interface GenerationResultBlockProps {
  className?: string;
  text: string;
}

const GenerationResultBlock = ({className, text}: GenerationResultBlockProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <GenerationBlockContainer className={className}>
      <div className={'content'}>{text}</div>
      <div className={'control-buttons-wrapper'}>
        <CustomButton
          className={'control-button'}
          title={t('generation.copy')}
          icon={CopyIcon}
          buttonHeight={BUTTON_HEIGHT.THIN}
          iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
        />
        <CustomButton
          className={'control-button'}
          buttonHeight={BUTTON_HEIGHT.THIN}
          title={t('generation.save')}
          icon={SaveIcon}
          iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
        />
        <CustomButton
          className={'control-button'}
          title={t('generation.moreSimilar')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          icon={MoreSimilarIcon}
          iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
        />
        <CustomButton
          className={'control-button'}
          title={t('generation.delete')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          icon={DeleteIcon}
          iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
        />
        <CustomButton
          className={'control-button'}
          title={t('generation.antiPlagiarism')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          icon={PlagiarismIcon}
          iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
        />
      </div>
    </GenerationBlockContainer>
  );
};

export default GenerationResultBlock;
