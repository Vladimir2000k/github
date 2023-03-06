import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import EllipsisText from '../../../../components/ElipsisText';
import CustomButton, {BUTTON_HEIGHT} from '../../../../components/uiKit/Button';
import CustomDropdownMenu from '../../../../components/uiKit/CustomDropdownMenu';
import DropdownButton, {
  DROPDOWN_BUTTON_TYPE,
} from '../../../../components/uiKit/CustomDropdownMenu/components/DropdownButton';
import DropdownHorizontalSeparator from '../../../../components/uiKit/CustomDropdownMenu/components/DropdownHorizontalSeparator';
import {ReactComponent as Arrow} from '../../../../resources/icons/Arrow_right.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 278px;

  padding: 20px 0 10px;
  border-radius: 10px;
  box-sizing: border-box;

  box-shadow: -4px 4px 30px rgba(11, 0, 140, 0.1);

  .heading {
    margin: 0 18px 18px;

    white-space: pre-line;
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    text-align: center;
    color: #696871;
  }

  .instruments {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 8px;
    padding-right: 20px;
    margin-top: auto;

    &__button {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      color: ${(props) => props.theme.colors.realPrimary};
      background-color: ${(props) => props.theme.colors.white};

      &:hover {
        color: ${(props) => props.theme.colors.accent};
      }

      &:focus {
        box-shadow: none;
      }
    }
  }
`;

const StyledDropdown = styled(CustomDropdownMenu)`
  .custom-dropdown-menu {
    transform: translate(0px, 27px) !important;
  }
`;

interface WorkspaceCardProps {
  id: number;
  className?: string;
  headingText: string;
  onEnterButtonClick: (id: number) => void;
  onSettingsButtonClick: (id: number) => void;
  onDeleteButtonClick: (id: number) => void;
}

const WorkspaceCard = ({
  id,
  className,
  headingText,
  onEnterButtonClick,
  onSettingsButtonClick,
  onDeleteButtonClick,
}: WorkspaceCardProps): JSX.Element => {
  const {t} = useTranslation();
  return (
    <Container className={className}>
      <EllipsisText lines={2}>
        <div className={'heading'}>{headingText}</div>
      </EllipsisText>
      <div className={'instruments'}>
        <CustomButton
          className={'instruments__button'}
          title={t('workspaces.enter')}
          buttonHeight={BUTTON_HEIGHT.THIN}
          icon={Arrow}
          onClick={() => onEnterButtonClick(id)}
        />
        <StyledDropdown>
          <DropdownButton
            title={t('workspaceModify.rename')}
            buttonType={DROPDOWN_BUTTON_TYPE.COMMON}
            onClick={() => onSettingsButtonClick(id)}
          />
          <DropdownHorizontalSeparator />
          <DropdownButton
            title={t('workspaceModify.delete')}
            buttonType={DROPDOWN_BUTTON_TYPE.WARNING}
            onClick={() => onDeleteButtonClick(id)}
          />
        </StyledDropdown>
      </div>
    </Container>
  );
};

export default WorkspaceCard;
