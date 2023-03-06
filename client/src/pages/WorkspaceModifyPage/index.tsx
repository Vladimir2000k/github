import React, {useCallback, useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import MainPagesContainer from '../../components/MainPagesContainer';
import MainPagesContentContainer from '../../components/MainPagesContentContainer';
import CustomButton from '../../components/uiKit/Button';
import ErrorMessage from '../../components/uiKit/ErrorMessage';
import CustomInput from '../../components/uiKit/Input';
import CustomLabel from '../../components/uiKit/Label';
import UserAvatar from '../../components/UserAvatar';
import {selectAppLanguage} from '../../store/appGlobal/selectors';
import {WorkspaceModifyActions} from '../../store/common/reducerActions';
import {WorkspaceModifySagaActions} from '../../store/common/sagaActions';
import {
  selectWorkspaceModifyCreateErrorsData,
  selectWorkspaceModifyCreationDate,
  selectWorkspaceModifyFormFieldsData,
  selectWorkspaceModifyOwner,
  selectWorkspaceModifyPageEvents,
  selectWorkspaceModifyUpdateErrorsData,
} from '../../store/workspaceModify/selectors';
import {WORKSPACE_MODIFY_EVENTS} from '../../store/workspaceModify/types';
import {localeDate} from '../../utils/dateLocalization';
const ContentContainer = styled(MainPagesContentContainer)`
  padding-top: 84px;

  .form-create,
  .form-update {
    width: 522px;

    &__primary-text {
      font-size: 20px;
      font-weight: 800;
      line-height: 40px;
      letter-spacing: -0.63px;
      color: ${(props) => props.theme.colors.realPrimary};
    }

    &__non-field-errors {
      margin-top: 10px;
    }

    &__required-form-fields-notification {
      margin-top: 20px;

      font-size: 12px;
      font-weight: 500;
      line-height: 15px;
      color: ${(props) => props.theme.colors.blueishGrey55};
    }

    &__label {
      margin-top: 20px;
    }

    &__workspace-name-input {
      margin-top: 10px;
    }

    &__state-line.creation-date-state-line {
      margin-top: 30px;
    }

    .creation-date-state-line {
      display: flex;
      justify-content: space-between;

      font-size: 14px;
      line-height: 24px;
      letter-spacing: -0.006em;
      color: ${(props) => props.theme.colors.inputCommonText};

      &__label {
        font-weight: 400;
      }

      &__value {
        font-weight: 800;
      }
    }

    &__state-line.owner-state-line {
      margin-top: 32px;
    }

    .owner-state-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.006em;

      .owner-data-container {
        display: flex;
        align-items: center;
        gap: 20px;

        &__email {
          color: ${(props) => props.theme.colors.inputCommonText};
        }
      }

      &__label {
        color: ${(props) => props.theme.colors.inputPlaceholderText};
      }
    }

    &__button {
      margin: 32px auto 0;
    }
  }
`;

const WorkspaceModifyPage = ({creation = false}: {creation?: boolean}): JSX.Element => {
  const language = useSelector(selectAppLanguage);

  const {workspaceName} = useSelector(selectWorkspaceModifyFormFieldsData);
  const workspaceCreationDate = useSelector(selectWorkspaceModifyCreationDate);
  const {
    firstName: ownerFirstName,
    lastName: ownerLastName,
    email: ownerEmail,
  } = useSelector(selectWorkspaceModifyOwner);
  const {nonFieldErrors: createPageNonFieldErrors, name: createPageWorkspaceName} = useSelector(
    selectWorkspaceModifyCreateErrorsData,
  );
  const {nonFieldErrors: updatePageNonFieldErrors, name: updatePageWorkspaceName} = useSelector(
    selectWorkspaceModifyUpdateErrorsData,
  );
  const event = useSelector(selectWorkspaceModifyPageEvents);

  const dispatch = useDispatch();

  const history = useHistory();

  const {workspaceId} = useParams<{workspaceId?: string}>();
  const id = Number(workspaceId);

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(WorkspaceModifyActions.clearCreationDate());
    dispatch(WorkspaceModifyActions.clearOwnerData());
    dispatch(WorkspaceModifyActions.clearFormFieldsData());
    dispatch(WorkspaceModifyActions.clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case WORKSPACE_MODIFY_EVENTS.NAVIGATE_TO_WORKSPACES:
          dispatch(WorkspaceModifyActions.handleCurrentEvent());
          history.push('/workspaces');
          break;
        case WORKSPACE_MODIFY_EVENTS.NAVIGATE_TO_WORKSPACE_INTERIOR_PROJECTS:
          dispatch(WorkspaceModifyActions.handleCurrentEvent());
          history.push('/workspaces/' + event.payload);
          break;
        case WORKSPACE_MODIFY_EVENTS.ERROR:
          dispatch(WorkspaceModifyActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history, id]);

  useEffect(() => {
    if (id !== undefined && creation === false) {
      dispatch(WorkspaceModifySagaActions.getWorkspace({id}));
    }
  }, [dispatch, id, creation]);

  const workspaceCreationDateToDisplay = useMemo(() => {
    return localeDate({
      creationDate: workspaceCreationDate,
      language,
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    });
  }, [language, workspaceCreationDate]);

  const onInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        WorkspaceModifyActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  const onCreateWorkspaceButtonClick = useCallback(() => {
    dispatch(WorkspaceModifySagaActions.createWorkspace());
  }, [dispatch]);

  const onUpdateWorkspaceButtonClick = useCallback(() => {
    dispatch(WorkspaceModifySagaActions.updateWorkspace({id}));
  }, [dispatch, id]);

  return (
    <MainPagesContainer>
      <ContentContainer>
        {creation ? (
          <div className={'form-createProject'}>
            <div className={'form-create__primary-text'}>
              {t('workspaceModify.workspaceCreation')}
            </div>
            {createPageNonFieldErrors.length > 0 && (
              <ErrorMessage
                className={'form-create__non-field-errors'}
                errors={createPageNonFieldErrors}
              />
            )}
            <div className={'form-create__required-form-fields-notification'}>
              {t('workspaceModify.formRequiredFieldsNotification')}
            </div>
            <CustomLabel className={'form-create__label'}>
              {t('workspaceModify.workspaceNameInputLabel')}
            </CustomLabel>
            <CustomInput
              className={'form-create__workspace-name-input'}
              name={'workspaceName'}
              value={workspaceName}
              errors={createPageWorkspaceName}
              placeholder={t('workspaceModify.workspaceNameInputPlaceholder')}
              onChange={onInputChange}
              isRequired={true}
            />
            <CustomButton
              className={'form-create__button'}
              title={t('workspaceModify.createButtonText')}
              onClick={onCreateWorkspaceButtonClick}
            />
          </div>
        ) : (
          <div className={'form-update'}>
            <div className={'form-update__primary-text'}>
              {t('workspaceModify.workspaceUpdate')}
            </div>
            {createPageNonFieldErrors.length > 0 && (
              <ErrorMessage
                className={'form-update__non-field-errors'}
                errors={updatePageNonFieldErrors}
              />
            )}
            <div className={'form-update__required-form-fields-notification'}>
              {t('workspaceModify.formRequiredFieldsNotification')}
            </div>
            <CustomLabel className={'form-update__label'}>
              {t('workspaceModify.workspaceNameInputLabel')}
            </CustomLabel>

            <CustomInput
              className={'form-update__workspace-name-input'}
              name={'workspaceName'}
              value={workspaceName}
              errors={updatePageWorkspaceName}
              placeholder={t('workspaceModify.workspaceNameInputPlaceholder')}
              onChange={onInputChange}
              isRequired={true}
            />
            <div className="form-update__state-line creation-date-state-line">
              <div className="creation-date-state-line__label">
                {t('workspaceModify.creationDateLabel')}
              </div>
              <div className="creation-date-state-line__value">
                {workspaceCreationDateToDisplay}
              </div>
            </div>
            <div className="form-update__state-line owner-state-line">
              <div className="owner-state-line-line__value owner-data-container">
                <UserAvatar
                  className="owner-data-container__user-avatar"
                  firstName={ownerFirstName}
                  lastName={ownerLastName}
                />
                <div className="owner-data-container__email">{ownerEmail}</div>
              </div>
              <div className="owner-state-line__label">{t('workspaceModify.owner')}</div>
            </div>
            <CustomButton
              className={'form-update__button'}
              title={t('workspaceModify.updateButtonText')}
              onClick={onUpdateWorkspaceButtonClick}
            />
          </div>
        )}
      </ContentContainer>
    </MainPagesContainer>
  );
};

export default WorkspaceModifyPage;
