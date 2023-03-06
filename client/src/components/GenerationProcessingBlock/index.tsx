import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {ReactComponent as CatSpinner} from '../../resources/icons/Cat_spinner.svg';

const Spinner = styled.img`
  width: 158px;
  height: 160px;
`;

const BlockContainer = styled.div`
  padding: 30px 0 20px;

  .spinner-container {
    display: flex;
    justify-content: center;

    &__spinner {
      animation-name: cat-spinner;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      @keyframes cat-spinner {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(-360deg);
        }
      }
    }
  }

  & .notification-heading {
    margin-top: 20px;

    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
    color: ${(props) => props.theme.colors.primary};
  }

  & .notification-text {
    width: 426px;
    margin: 26px auto 0;

    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    text-align: center;
    color: ${(props) => props.theme.colors.primary};
  }
`;

interface GenerationProcessingBlockProps {
  className?: string;
}

const GenerationProcessingBlock = ({className}: GenerationProcessingBlockProps): JSX.Element => {
  const {t} = useTranslation();
  return (
    <BlockContainer className={className}>
      <div className="spinner-container">
        <div className="spinner-container__spinner">
          <Spinner as={CatSpinner} />
        </div>
      </div>
      <div className="notification-heading">{t('generation.processingHeading')}</div>
      <div className="notification-text">{t('generation.processingText')}</div>
    </BlockContainer>
  );
};

export default GenerationProcessingBlock;
