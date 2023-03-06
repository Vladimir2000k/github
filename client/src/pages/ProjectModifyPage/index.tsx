import React, {useCallback, useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import MainPagesContainer from '../../components/MainPagesContainer';
import MainPagesContentContainer from '../../components/MainPagesContentContainer';
import CustomButton from '../../components/uiKit/Button';
import CustomDropdown, {DropdownOption} from '../../components/uiKit/CustomDropdown';
import ErrorMessage from '../../components/uiKit/ErrorMessage';
import CustomInput from '../../components/uiKit/Input';
import CustomLabel from '../../components/uiKit/Label';
import {GENERATION_LANG_OPTIONS} from '../../store/appGlobal/types';
import {ProjectModifyActions} from '../../store/common/reducerActions';
import {ProjectModifySagaActions, ProjectsSagaActions} from '../../store/common/sagaActions';
import {
  selectProjectModifyCreateErrorsData,
  selectProjectModifyFormFieldsData,
  selectProjectModifyPageEvents,
  selectProjectModifyPageGenerationLanguages,
  selectProjectModifyUpdateErrorsData,
} from '../../store/projectModify/selectors';
import {PROJECT_MODIFY_EVENTS} from '../../store/projectModify/types';

const ContentContainer = styled(MainPagesContentContainer)`
  padding-top: 84px;
  flex: 1;

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

    &__input {
      margin-top: 10px;
    }

    &__dropdown {
      margin-top: 10px;
    }

    &__button {
      margin: 32px auto 51px;
    }
  }
`;

const mockLangOptions = {
  // [GENERATION_LANG_OPTIONS.RU]: {
  //   value: GENERATION_LANG_OPTIONS.RU,
  //   flag: '🇷🇺',
  //   lang: 'Русский',
  // },
  [GENERATION_LANG_OPTIONS.EN]: {
    value: GENERATION_LANG_OPTIONS.EN,
    flag: '🇬🇧',
    lang: 'English',
  },
};

const ProjectModifyPage = ({creation = false}: {creation?: boolean}): JSX.Element => {
  // TODO use the default site generation language or that one witch has been set globally
  const {name, description} = useSelector(selectProjectModifyFormFieldsData);
  const {sourceLang, targetLang} = useSelector(selectProjectModifyPageGenerationLanguages);
  const {
    nonFieldErrors: createPageNonFieldErrors,
    name: createPageProjectNameErrors,
    description: createPageProjectDescriptionErrors,
  } = useSelector(selectProjectModifyCreateErrorsData);
  const {
    nonFieldErrors: updatePageNonFieldErrors,
    name: updatePageProjectNameErrors,
    description: updatePageProjectDescriptionErrors,
  } = useSelector(selectProjectModifyUpdateErrorsData);
  const event = useSelector(selectProjectModifyPageEvents);

  const dispatch = useDispatch();

  const history = useHistory();

  const {projectId, workspaceId} = useParams<{projectId?: string; workspaceId?: string}>();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(ProjectModifyActions.clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case PROJECT_MODIFY_EVENTS.NAVIGATE_TO_WORKSPACE_ROOT:
          dispatch(ProjectModifyActions.handleCurrentEvent());
          history.push(`/workspaces/${event.payload.workspaceId}`);
          break;
        case PROJECT_MODIFY_EVENTS.NAVIGATE_TO_GENERATION:
          dispatch(ProjectModifyActions.handleCurrentEvent());
          history.push('/generation');
          break;
        case PROJECT_MODIFY_EVENTS.ERROR:
          dispatch(ProjectModifyActions.handleCurrentEvent());
          break;
      }
    }
  }, [dispatch, event, history]);

  useEffect(() => {
    if (!creation) {
      dispatch(ProjectsSagaActions.getProject({workspaceId, projectId}));
    }
  }, [creation, dispatch, projectId, workspaceId]);

  const languageDropdownOptions = useMemo<Array<DropdownOption>>(() => {
    return Object.values(mockLangOptions).map((item) => {
      return {
        value: item.value,
        label: item.flag + ' ' + item.lang,
      };
    });
  }, []);

  const {selectedSourceLangOption, selectedTargetLangOption} = useMemo(() => {
    return {
      selectedSourceLangOption: {
        value: mockLangOptions[sourceLang].value,
        label: mockLangOptions[sourceLang].flag + ' ' + mockLangOptions[sourceLang].lang,
      },
      selectedTargetLangOption: {
        value: mockLangOptions[targetLang].value,
        label: mockLangOptions[targetLang].flag + ' ' + mockLangOptions[targetLang].lang,
      },
    };
  }, [sourceLang, targetLang]);

  const onInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        ProjectModifyActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  const onInputLanguageSelect = useCallback(
    (language) => {
      dispatch(ProjectModifyActions.updateGenerationLanguagesData({sourceLang: language.value}));
    },
    [dispatch],
  );

  const onOutputLanguageSelect = useCallback(
    (language) => {
      dispatch(ProjectModifyActions.updateGenerationLanguagesData({targetLang: language.value}));
    },
    [dispatch],
  );

  const onCreateProjectButtonClick = useCallback(() => {
    dispatch(ProjectModifySagaActions.createProject({workspaceId: Number(workspaceId)}));
  }, [dispatch, workspaceId]);

  const onUpdateProjectButtonClick = useCallback(() => {
    dispatch(
      ProjectModifySagaActions.updateProject({
        projectId: Number(projectId),
        workspaceId: Number(workspaceId),
      }),
    );
  }, [dispatch, projectId, workspaceId]);

  return (
    <MainPagesContainer>
      <ContentContainer>
        {creation ? (
          <div className={'form-createProject'}>
            <div className={'form-create__primary-text'}>{t('projectModify.projectCreation')}</div>
            {createPageNonFieldErrors.length > 0 && (
              <ErrorMessage
                className={'form-create__non-field-errors'}
                errors={createPageNonFieldErrors}
              />
            )}
            <div className={'form-create__required-form-fields-notification'}>
              {t('projectModify.formRequiredFieldsNotification')}
            </div>
            <CustomLabel className={'form-create__label'}>
              {t('projectModify.projectNameInputLabel')}
            </CustomLabel>
            <CustomInput
              className={'form-create__input'}
              name={'name'}
              value={name}
              errors={createPageProjectNameErrors}
              placeholder={t('projectModify.projectNameInputPlaceholder')}
              onChange={onInputChange}
              isRequired={true}
            />
            <CustomLabel className={'form-create__label'}>
              {t('projectModify.projectDescriptionInputLabel')}
            </CustomLabel>
            <CustomInput
              className={'form-create__input'}
              name={'description'}
              value={description}
              errors={createPageProjectDescriptionErrors}
              placeholder={t('projectModify.projectDescriptionInputPlaceholder')}
              onChange={onInputChange}
              isRequired={true}
            />
            <CustomLabel className={'form-create__label'}>
              {t('projectModify.inputLanguageDropdownLabel')}
            </CustomLabel>
            <CustomDropdown
              className={'form-create__dropdown'}
              options={languageDropdownOptions}
              selectedOption={selectedSourceLangOption}
              onSelect={onInputLanguageSelect}
            />
            <CustomLabel className={'form-create__label'}>
              {t('projectModify.outputLanguageDropdownLabel')}
            </CustomLabel>
            <CustomDropdown
              className={'form-create__dropdown'}
              options={languageDropdownOptions}
              selectedOption={selectedTargetLangOption}
              onSelect={onOutputLanguageSelect}
            />
            <CustomButton
              className={'form-create__button'}
              title={t('projectModify.createButtonText')}
              onClick={onCreateProjectButtonClick}
            />
          </div>
        ) : (
          <div className={'form-update'}>
            <div className={'form-update__primary-text'}>{t('projectModify.projectUpdate')}</div>
            {createPageNonFieldErrors.length > 0 && (
              <ErrorMessage
                className={'form-update__non-field-errors'}
                errors={updatePageNonFieldErrors}
              />
            )}
            <div className={'form-update__required-form-fields-notification'}>
              {t('projectModify.formRequiredFieldsNotification')}
            </div>
            <CustomLabel className={'form-update__label'}>
              {t('projectModify.projectNameInputLabel')}
            </CustomLabel>
            <CustomInput
              className={'form-update__input'}
              name={'name'}
              value={name}
              errors={updatePageProjectNameErrors}
              placeholder={t('projectModify.projectNameInputPlaceholder')}
              onChange={onInputChange}
              isRequired={true}
            />
            <CustomLabel className={'form-create__label'}>
              {t('projectModify.projectDescriptionInputLabel')}
            </CustomLabel>
            <CustomInput
              className={'form-update__input'}
              name={'description'}
              value={description}
              errors={updatePageProjectDescriptionErrors}
              placeholder={t('projectModify.projectDescriptionInputPlaceholder')}
              onChange={onInputChange}
              isRequired={true}
            />
            <CustomLabel className={'form-update__label'}>
              {t('projectModify.inputLanguageDropdownLabel')}
            </CustomLabel>
            <CustomDropdown
              className={'form-update__dropdown'}
              options={languageDropdownOptions}
              selectedOption={selectedSourceLangOption}
              onSelect={onInputLanguageSelect}
            />
            <CustomLabel className={'form-update__label'}>
              {t('projectModify.outputLanguageDropdownLabel')}
            </CustomLabel>
            <CustomDropdown
              className={'form-update__dropdown'}
              options={languageDropdownOptions}
              selectedOption={selectedTargetLangOption}
              onSelect={onOutputLanguageSelect}
            />
            <CustomButton
              className={'form-update__button'}
              title={t('projectModify.updateButtonText')}
              onClick={onUpdateProjectButtonClick}
            />
          </div>
        )}
      </ContentContainer>
    </MainPagesContainer>
  );
};

export default ProjectModifyPage;
