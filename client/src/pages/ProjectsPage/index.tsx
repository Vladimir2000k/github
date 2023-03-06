import React, {useCallback, useEffect, useMemo} from 'react';

import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import MainPagesContainer from '../../components/MainPagesContainer';
import MainPagesContentContainer from '../../components/MainPagesContentContainer';
import CustomButton, {BUTTON_HEIGHT, CUSTOM_BUTTON_ICON_ALIGN} from '../../components/uiKit/Button';
import ButtonFloatingBackground from '../../components/uiKit/Button/ButtonFloatingBackground';
import CustomTooltip from '../../components/uiKit/CustomTooltip';
import {ReactComponent as Add} from '../../resources/icons/Add.svg';
import {ReactComponent as ArrowBack} from '../../resources/icons/Arrow_back.svg';
import {ReactComponent as ArrowRight} from '../../resources/icons/Arrow_right.svg';
import {ReactComponent as Info} from '../../resources/icons/Info.svg';
import ModalBg from '../../resources/images/Modal_bg.png';
import {ProjectModifySagaActions, ProjectsSagaActions} from '../../store/common/sagaActions';
import {selectProjects, selectProjectsPageBalance} from '../../store/projects/selectors';
import {numericUnitNamePostfix} from '../../utils/numericUnitNamePostfix';

import ProjectCard from './components/ProjectCard';

const ContentContainer = styled(MainPagesContentContainer)`
  padding: 40px 0 60px;

  .back-to-workspaces-button-container {
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

  .instruments-block {
    display: flex;
    justify-content: space-between;

    gap: 90px;
    margin-top: 30px;

    width: 1100px;

    .create-new-project-block {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 278px;

      gap: 20px;
      padding: 30px 18px;

      box-shadow: -4px 4px 30px rgba(11, 0, 140, 0.1);
      border-radius: 10px;

      &__icon {
        height: 54px;
        width: 54px;
        color: ${(props) => props.theme.colors.realPrimary};
      }

      &__primary {
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        text-align: center;
        color: ${(props) => props.theme.colors.grey20};

        padding: 0 10px;
      }

      &__secondary {
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
        color: ${(props) => props.theme.colors.grey20};
      }
    }

    .tariff-block {
      width: 706px;
      padding: 20px 62px 30px;

      border-radius: 10px;

      background-color: #f4f9fd;
      background-image: url(${ModalBg});
      image-rendering: -webkit-optimize-contrast;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: right;
      filter: drop-shadow(-4px 4px 30px rgba(11, 0, 140, 0.1));

      &__heading {
        font-size: 24px;
        font-weight: 800;
        line-height: 30px;
        text-align: center;
        color: ${(props) => props.theme.colors.secondary};
      }

      &__balance {
        margin-top: 20px;
      }

      .balance-state-block {
        display: flex;
        justify-content: space-between;
        gap: 51px;

        &__state {
          width: 160px;
        }

        .state-container {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 1px 6px 0;

          &__icon {
            position: absolute;
            top: 2px;
            right: 2px;
            z-index: 1000;
            color: ${(props) => props.theme.colors.realPrimary};
          }

          &__value {
            font-size: 70px;
            font-weight: 700;
            line-height: 75px;
            text-align: center;
            color: ${(props) => props.theme.colors.realPrimary};
          }

          &__primary {
            font-size: 24px;
            font-weight: 700;
            line-height: 30px;
            text-align: center;
            color: ${(props) => props.theme.colors.grey20};
            margin-bottom: auto;
          }

          &__secondary {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            text-align: center;
            color: #000000;

            margin-top: 10px;
          }

          &__button {
            margin-top: 8px;

            .button__icon {
              height: 18px;
              width: 18px;
            }
          }
        }
      }
    }
  }

  .projects-list-header {
    margin-top: 40px;
  }

  .header-container {
    display: flex;
    justify-content: space-between;

    width: 1100px;
    padding: 0 13px;

    &__heading {
      font-size: 30px;
      font-weight: 800;
      line-height: 40px;
      color: ${(props) => props.theme.colors.primary};
      border-bottom: 4px solid ${(props) => props.theme.colors.primary};
    }

    &__searching-input {
      width: 531px;
    }
  }

  .projects-grid {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(4, 246px);

    width: 1100px;
    padding: 40px 13px 60px;
  }
`;

const BackToWorkspacesButton = styled(CustomButton)`
  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }

  &:focus {
    box-shadow: none;
  }
`;

const Icon = styled.img``;

const ProjectsPage = (): JSX.Element => {
  const {
    projectsAdditional,
    plan,
    antiplagiarismChecks,
    credits,
    nextPlanProlongationDate,
    usedProjects,
  } = useSelector(selectProjectsPageBalance);
  const projects = useSelector(selectProjects);

  const dispatch = useDispatch();

  const history = useHistory();

  const {workspaceId} = useParams<{workspaceId: string}>();

  const {t} = useTranslation();

  const isDataLoaded = useMemo(() => {
    return (
      projectsAdditional !== undefined &&
      plan !== undefined &&
      antiplagiarismChecks !== undefined &&
      credits !== undefined &&
      nextPlanProlongationDate !== undefined &&
      usedProjects !== undefined
    );
  }, [
    antiplagiarismChecks,
    credits,
    nextPlanProlongationDate,
    plan,
    projectsAdditional,
    usedProjects,
  ]);

  const {balanceProjectsCount, tariffPlan} = useMemo(() => {
    return {
      balanceProjectsCount: plan?.maxProjects + projectsAdditional - usedProjects,
      tariffPlan:
        plan?.type[0]?.toUpperCase() + plan?.type?.substring(1, plan?.type?.length)?.toLowerCase(),
    };
  }, [plan?.maxProjects, plan?.type, projectsAdditional, usedProjects]);

  useEffect(() => {
    dispatch(ProjectsSagaActions.initProjectsPage({workspaceId: Number(workspaceId)}));
  }, [dispatch, workspaceId]);

  const balanceUpdateDate = useMemo(() => {
    return String(moment(nextPlanProlongationDate).format('D.MM.yyyy'));
  }, [nextPlanProlongationDate]);

  const onCreateNewProjectClick = useCallback(() => {
    history.push('/project-modify/');
  }, [history, workspaceId]);

  const onProjectClick = useCallback(
    (projectId: number) => {
      history.push('/workspaces/' + workspaceId + '/projects/' + projectId);
    },
    [history, workspaceId],
  );

  const onProjectSettingsButtonClick = useCallback(
    (id: number) => {
      history.push(`/project-modify/${workspaceId}/project/${id}`);
    },
    [history, workspaceId],
  );

  const onDeleteProject = useCallback(
    (projectId: number) => {
      dispatch(
        ProjectModifySagaActions.deleteProject({workspaceId: Number(workspaceId), projectId}),
      );
    },
    [dispatch, workspaceId],
  );

  return (
    <MainPagesContainer>
      {isDataLoaded && (
        <ContentContainer>
          <div className={'back-to-workspaces-button-container'}>
            <BackToWorkspacesButton
              className={'back-to-workspaces-button-container__button'}
              title={t('projects.backToWorkspaces')}
              icon={ArrowBack}
              iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
              buttonHeight={BUTTON_HEIGHT.THIN}
              onClick={() => history.push('/workspaces')}
            />
          </div>
          <div className="instruments-block">
            <div className="create-new-project-block">
              <Icon className={'create-new-project-block__icon'} as={Add} />
              <div className="create-new-project-block__primary">
                {t('projects.createProjectBlock.primary')}
              </div>
              <div className="create-new-project-block__secondary">
                {t('projects.createProjectBlock.secondary')}
              </div>
              <CustomButton
                className={'create-new-project-block__button'}
                title={t('projects.createProjectBlock.actionButtonText')}
                buttonHeight={BUTTON_HEIGHT.THIN}
                icon={ArrowRight}
                onClick={onCreateNewProjectClick}
              />
            </div>
            <div className="tariff-block">
              <div className="tariff-block__heading">
                {t('projects.tariffBlock.heading')} {tariffPlan}
              </div>
              <div className="tariff-block__balance balance-state-block">
                <div className="balance-state-block__state state-container">
                  <CustomTooltip title={t('projects.tariffBlock.creditHint')}>
                    <Icon className="state-container__icon" as={Info} />
                  </CustomTooltip>
                  <div className="state-container__value">{credits}</div>
                  <div className="state-container__primary">
                    {numericUnitNamePostfix(
                      credits,
                      t('projects.tariffBlock.creditsLeftNumeralDependentForms.language'),
                      t('projects.tariffBlock.creditsLeftNumeralDependentForms.wordForms'),
                    )}
                  </div>
                  <div className="state-container__secondary">
                    {t('projects.tariffBlock.willBeUpdated')} {balanceUpdateDate}
                  </div>
                  <ButtonFloatingBackground
                    className="state-container__button"
                    title={t('projects.tariffBlock.refill')}
                    bgColor={'#00D1FF'}
                    textColorNormal={'#FFF'}
                    blobsColor={'#353bce'}
                    textColorHover={'#fff'}
                    icon={Add}
                    iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
                  />
                </div>
                <div className="balance-state-block__state state-container">
                  <div className="state-container__value">{balanceProjectsCount}</div>
                  <div className="state-container__primary">
                    {numericUnitNamePostfix(
                      balanceProjectsCount,
                      t('projects.tariffBlock.personalProjectsNumeralDependentForms.language'),
                      t('projects.tariffBlock.personalProjectsNumeralDependentForms.wordForms'),
                    )}
                  </div>
                  <div className="state-container__secondary">
                    {t('projects.tariffBlock.willBeUpdated')} {balanceUpdateDate}
                  </div>
                  <ButtonFloatingBackground
                    className="state-container__button"
                    title={t('projects.tariffBlock.refill')}
                    bgColor={'#00D1FF'}
                    textColorNormal={'#FFF'}
                    blobsColor={'#353bce'}
                    textColorHover={'#fff'}
                    icon={Add}
                    iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
                  />
                </div>
                <div className="balance-state-block__state state-container">
                  <CustomTooltip title={t('projects.tariffBlock.antiPlagiarismCheckHint')}>
                    <Icon className="state-container__icon" as={Info} />
                  </CustomTooltip>
                  <div className="state-container__value">{antiplagiarismChecks}</div>
                  <div className="state-container__primary">
                    {numericUnitNamePostfix(
                      antiplagiarismChecks,
                      t('projects.tariffBlock.antiPlagiarismChecksNumeralDependentForms.language'),
                      t('projects.tariffBlock.antiPlagiarismChecksNumeralDependentForms.wordForms'),
                    )}
                  </div>
                  <div className="state-container__secondary">
                    {t('projects.tariffBlock.willBeUpdated')} {balanceUpdateDate}
                  </div>
                  <ButtonFloatingBackground
                    className="state-container__button"
                    title={t('projects.tariffBlock.refill')}
                    bgColor={'#00D1FF'}
                    textColorNormal={'#FFF'}
                    blobsColor={'#353bce'}
                    textColorHover={'#fff'}
                    icon={Add}
                    iconAlign={CUSTOM_BUTTON_ICON_ALIGN.LEFT}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="projects-list-header header-container">
            <div className="header-container__heading">{t('projects.projects')}</div>
          </div>
          {projects.length > 0 && (
            <div className="projects-grid">
              {projects.map((project) => {
                return (
                  <ProjectCard
                    id={project.pk}
                    headingText={project.name}
                    description={project.description}
                    onCardClick={onProjectClick}
                    onSettingsButtonClick={onProjectSettingsButtonClick}
                    onDeleteProject={onDeleteProject}
                  />
                );
              })}
            </div>
          )}
        </ContentContainer>
      )}
    </MainPagesContainer>
  );
};

export default ProjectsPage;
