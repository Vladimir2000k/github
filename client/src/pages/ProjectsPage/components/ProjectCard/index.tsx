import React from 'react';

import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import EllipsisText from '../../../../components/ElipsisText';
import CustomDropdownMenu from '../../../../components/uiKit/CustomDropdownMenu';
import DropdownButton, {
  DROPDOWN_BUTTON_TYPE,
} from '../../../../components/uiKit/CustomDropdownMenu/components/DropdownButton';
import DropdownHorizontalSeparator from '../../../../components/uiKit/CustomDropdownMenu/components/DropdownHorizontalSeparator';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  box-shadow: -4px 4px 30px rgba(11, 0, 140, 0.1);
  padding: 20px 0;
  border-radius: 10px;

  .heading {
    white-space: pre-line;

    height: 52px;
    margin: 0 10px;

    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    color: ${(props) => props.theme.colors.grey20};
  }

  .description-container {
    height: 132px;

    padding: 20px 10px;
    margin: 20px 10px 0;
    border-radius: 10px;

    background-color: #f4f9fd;

    font-size: 8px;
    line-height: 10px;
    color: ${(props) => props.theme.colors.grey20};

    &__primary {
      font-weight: 800;
      text-transform: uppercase;
    }

    &__summary {
      white-space: pre-line;

      margin-top: 10px;

      font-weight: 400;
    }
  }

  .settings-button {
    margin: 20px 20px 0 auto;
    cursor: pointer;
    color: ${(props) => props.theme.colors.realPrimary};

    &:hover {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`;

const StyledDropdown = styled(CustomDropdownMenu)`
  align-self: flex-end;
  margin: 20px 20px 0;
`;

interface ProjectCardProps {
  id: number;
  className?: string;
  headingText: string;
  description: string;
  onCardClick: (id: number) => void;
  onSettingsButtonClick: (id: number) => void;
  onDeleteProject: (id: number) => void;
}

const ProjectCard = ({
  id,
  className,
  headingText,
  description,
  onCardClick,
  onSettingsButtonClick,
  onDeleteProject,
}: ProjectCardProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <Container className={className} onClick={() => onCardClick(id)}>
      <EllipsisText lines={2}>
        <div className={'heading'}>{headingText}</div>
      </EllipsisText>
      <div className={'description-container'}>
        <div className={'description-container__primary'}>{t('projects.description')}</div>
        <EllipsisText lines={11}>
          <div className="description-container__summary">{description}</div>
        </EllipsisText>
      </div>
      <StyledDropdown>
        <DropdownButton
          title={t('projects.settings')}
          buttonType={DROPDOWN_BUTTON_TYPE.COMMON}
          onClick={(event) => {
            event.stopPropagation();
            onSettingsButtonClick(id);
          }}
        />
        <DropdownHorizontalSeparator />
        <DropdownButton
          title={t('projects.delete')}
          buttonType={DROPDOWN_BUTTON_TYPE.WARNING}
          onClick={(event) => {
            event.stopPropagation();
            onDeleteProject(id);
          }}
        />
      </StyledDropdown>
    </Container>
  );
};

export default ProjectCard;
