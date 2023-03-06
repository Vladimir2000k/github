import React, {useCallback, useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import MainPagesContainer from '../../components/MainPagesContainer';
import MainPagesContentContainer from '../../components/MainPagesContentContainer';
import OptimizedPNGImage from '../../components/OptimizedPNGImage';
import CustomButton, {BUTTON_HEIGHT} from '../../components/uiKit/Button';
import ButtonFloatingBackground from '../../components/uiKit/Button/ButtonFloatingBackground';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import {ReactComponent as Add} from '../../resources/icons/Add.svg';
import RocketPNG from '../../resources/images/Home_page_rocket_image.png';
import {WorkspacesActions} from '../../store/common/reducerActions';
import {WorkspaceModifySagaActions, WorkspacesSagaActions} from '../../store/common/sagaActions';
import {selectWorkspaces, selectWorkspacesPageCurrentEvent} from '../../store/workspaces/selectors';
import {WORKSPACES_EVENTS} from '../../store/workspaces/types';

import WorkspaceCard from './components/WorkspaceCard';

const ContentContainer = styled(MainPagesContentContainer)`
  flex: 1;

  .workspaces-grid {
    display: grid;
    grid-row-gap: 40px;
    grid-column-gap: 28px;
    grid-template-columns: repeat(3, 1fr);

    width: 890px;

    padding: 20px 0;
  }
`;

const RocketImage = styled(OptimizedPNGImage)`
  height: 224px;
  width: 272px;
  margin-top: 39px;
`;

const PrimaryText = styled(TextBlock)`
  margin-top: 40px;
`;

const SecondaryText = styled(TextBlock)`
  margin-top: 10px;
  line-height: 18px;
`;

const CreateFirstWorkspaceButton = styled(CustomButton)`
  margin-top: 20px;
`;

const FixedInstrumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background-color: ${(props) => props.theme.colors.white};

  .workspace-type-toggler {
    display: flex;
    justify-content: space-between;

    height: 41px; // TODO remove after workspaces type division appears
    width: 557px;

    margin-top: 40px;
  }
`;

const CreateNewWorkspaceButton = styled(ButtonFloatingBackground)`
  margin: 36px 0 16px;
  background-color: #ebe5ff;
  color: ${(props) => props.theme.colors.realPrimary};

  .button__icon-container {
    margin-left: 10px;
  }
`;

const WorkspacesPage = (): JSX.Element => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const workspaces = useSelector(selectWorkspaces);
  const event = useSelector(selectWorkspacesPageCurrentEvent);

  const dispatch = useDispatch();
  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(WorkspacesSagaActions.initWorkspacesPage());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case WORKSPACES_EVENTS.PAGE_INIT_PROCESSED:
          dispatch(WorkspacesActions.handleCurrentEvent());
          setIsPageLoaded(true);
          break;
      }
    }
  }, [dispatch, event]);

  const onWorkspaceEnterButtonClick = useCallback(
    (workspaceId: number) => {
      history.push('/workspaces/' + workspaceId);
    },
    [history],
  );

  const onWorkspaceSettingsButtonClick = useCallback(
    (workspaceId: number) => {
      history.push('/workspace-modify/' + workspaceId);
    },
    [history],
  );

  const onWorkspaceDelete = useCallback(
    (workspaceId: number) => {
      dispatch(WorkspaceModifySagaActions.deleteWorkspace({id: workspaceId}));
    },
    [dispatch],
  );

  const isWorkspacesExists = !!workspaces?.length;

  return (
    <MainPagesContainer>
      <FixedInstrumentContainer>
        <div className={'workspace-type-toggler'} />
        {isPageLoaded && isWorkspacesExists && (
          <CreateNewWorkspaceButton
            title={t('workspaces.createNewWorkspaceBtnText')}
            buttonHeight={BUTTON_HEIGHT.NORMAL}
            icon={Add}
            onClick={() => history.push('/workspace-modify')}
          />
        )}
      </FixedInstrumentContainer>
      {!isWorkspacesExists && isPageLoaded ? (
        <ContentContainer>
          <RocketImage src={RocketPNG} />
          <PrimaryText type={TEXT_BLOCK_TYPE.H5}>{t('workspaces.primary')}</PrimaryText>
          <SecondaryText type={TEXT_BLOCK_TYPE.P7}>{t('workspaces.secondary')}</SecondaryText>
          <CreateFirstWorkspaceButton
            title={t('workspaces.createFirstWorkspaceBtnText')}
            onClick={() => history.push('/workspace-modify')}
          />
        </ContentContainer>
      ) : (
        <ContentContainer>
          <div className={'workspaces-grid'}>
            {workspaces.map(({pk, name}) => (
              <WorkspaceCard
                id={pk}
                key={pk}
                headingText={name}
                onEnterButtonClick={onWorkspaceEnterButtonClick}
                onSettingsButtonClick={onWorkspaceSettingsButtonClick}
                onDeleteButtonClick={onWorkspaceDelete}
              />
            ))}
          </div>
        </ContentContainer>
      )}
    </MainPagesContainer>
  );
};

export default WorkspacesPage;
