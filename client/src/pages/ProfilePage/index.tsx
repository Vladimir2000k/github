import React, {useCallback, useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import MainPagesContainer from '../../components/MainPagesContainer';
import MainPagesContentContainer from '../../components/MainPagesContentContainer';
import CustomButton, {BUTTON_FILLING_TYPE, BUTTON_HEIGHT} from '../../components/uiKit/Button';
import ButtonFloatingBackground from '../../components/uiKit/Button/ButtonFloatingBackground';
import ErrorMessage from '../../components/uiKit/ErrorMessage';
import CustomInput from '../../components/uiKit/Input';
import UserAvatar from '../../components/UserAvatar';
import {ReactComponent as Lock} from '../../resources/icons/Lock.svg';
import {ProfileActions} from '../../store/common/reducerActions';
import {ProfileSagaActions} from '../../store/common/sagaActions';
import {
  selectProfilePageCurrentEvent,
  selectProfilePagePasswordChangeFormErrorsData,
  selectProfilePagePasswordChangeFormFieldsData,
  selectProfilePageUserData,
} from '../../store/profile/selectors';
import {PROFILE_EVENTS} from '../../store/profile/types';
import {capitalizeFull} from '../../utils/textProcessing';

const ContentContainer = styled(MainPagesContentContainer)`
  padding: 40px 0 0;

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: 46px;

    .user-states {
      width: 522px;

      &__heading {
        font-size: 20px;
        font-weight: 800;
        line-height: 40px;
        letter-spacing: -0.0063em;
        color: ${(props) => props.theme.colors.primary};
      }

      &__line {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 20px;
      }

      .email-state-line {
        .avatar-and-email-block {
          display: flex;
          gap: 20px;
          align-items: center;

          &__email {
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.006em;
            color: ${(props) => props.theme.colors.inputCommonText};
          }
        }
      }

      .plan-state-line {
        .plan-state-block {
          display: flex;
          gap: 20px;
          align-items: center;

          &__label {
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
            color: ${(props) => props.theme.colors.blueishGrey55};
          }

          &__value {
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
            color: ${(props) => props.theme.colors.realPrimary};
          }
        }
      }
    }

    .update-password-form {
      display: flex;
      flex-direction: column;
      width: 522px;

      margin-top: 30px;

      &__label {
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        color: ${(props) => props.theme.colors.blueishGrey55};
      }

      &__required-form-fields-notification {
        font-size: 10px;
        font-weight: 500;
        line-height: 13px;
        color: ${(props) => props.theme.colors.blueishGrey55};

        margin-top: 10px;
      }

      .form-input {
        width: 100%;
      }

      &__old-password-input {
        margin-top: 10px;
      }

      &__new-password-input {
        margin-top: 30px;
      }

      &__password-confirmation-input {
        margin-top: 30px;
      }

      &__button {
        margin-top: 30px;
        width: fit-content;
      }
    }
  }
`;

const ProfilePage = (): JSX.Element => {
  const {firstName, lastName, plan, email} = useSelector(selectProfilePageUserData);
  const {oldPassword, newPassword1, newPassword2} = useSelector(
    selectProfilePagePasswordChangeFormFieldsData,
  );
  const {
    nonFieldErrors,
    oldPassword: oldPasswordErrors,
    newPassword1: newPasswordErrors,
    newPassword2: passwordConfirmationErrors,
  } = useSelector(selectProfilePagePasswordChangeFormErrorsData);
  const event = useSelector(selectProfilePageCurrentEvent);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(ProfileActions.clearErrorsData());
    dispatch(ProfileActions.clearEventsData());
    dispatch(ProfileActions.clearPasswordChangeFormFieldsData());
    dispatch(ProfileActions.clearUserData());
    dispatch(ProfileActions.clearUserFormFieldsData());
    dispatch(ProfileSagaActions.initProfilePage());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      switch (event.type) {
        case PROFILE_EVENTS.NAVIGATE_TO_LANDING:
          dispatch(ProfileActions.handleCurrentEvent());
          history.push('/');
          break;
      }
    }
  }, [dispatch, history, event]);

  const tariffPlanType = useMemo(() => {
    return capitalizeFull(plan);
  }, [plan]);

  const onPasswordInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        ProfileActions.updatePasswordChangeFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <MainPagesContainer>
      <ContentContainer>
        <div className="content-container">
          <div className="user-states">
            <div className="user-states__heading">{t('profile.heading')}</div>
            <div className="user-states__line email-state-line">
              <div className="avatar-and-email-block">
                <UserAvatar
                  className="avatar-and-email-block__user-avatar"
                  firstName={firstName}
                  lastName={lastName}
                />
                <div className="avatar-and-email-block__email">{email}</div>
              </div>
              <CustomButton
                className="email-state-line__button"
                title={t('profile.logout')}
                buttonHeight={BUTTON_HEIGHT.THIN}
                fillingType={BUTTON_FILLING_TYPE.OUTLINE}
                onClick={() => dispatch(ProfileSagaActions.logout())}
              />
            </div>
            <div className="user-states__line plan-state-line">
              <div className="plan-state-block">
                <div className="plan-state-block__label">{t('profile.planLabelText')}</div>
                <div className="plan-state-block__value">{tariffPlanType}</div>
              </div>
              <ButtonFloatingBackground
                className="plan-state-line__button"
                title={t('profile.upgrade')}
                buttonHeight={BUTTON_HEIGHT.THIN}
                onClick={() => history.push('/tariffs')}
                bgColor={'#00d1ff'}
                blobsColor={'#353bce'}
                textColorNormal={'#fff'}
                textColorHover={'#fff'}
              />
            </div>
          </div>
          <div className="update-password-form">
            <div className="update-password-form__label">{t('profile.passwordChangeLabel')}</div>
            <ErrorMessage className="update-password-form__errors" errors={nonFieldErrors} />
            <div className="update-password-form__required-form-fields-notification">
              {t('profile.formRequiredFieldsNotification')}
            </div>
            <CustomInput
              className="update-password-form__old-password-input form-input"
              name={'oldPassword'}
              type={'password'}
              placeholder={t('profile.oldPasswordInputPlaceholder')}
              placeholderIcon={Lock}
              value={oldPassword}
              errors={oldPasswordErrors}
              onChange={onPasswordInputChange}
              isRequired={true}
            />
            <CustomInput
              className="update-password-form__new-password-input form-input"
              name={'newPassword1'}
              type={'password'}
              placeholder={t('profile.newPasswordInputPlaceholder')}
              placeholderIcon={Lock}
              value={newPassword1}
              errors={newPasswordErrors}
              onChange={onPasswordInputChange}
              isRequired={true}
            />
            <CustomInput
              className="update-password-form__password-confirmation-input form-input"
              name={'newPassword2'}
              type={'password'}
              placeholder={t('profile.passwordConfirmationInputPlaceholder')}
              placeholderIcon={Lock}
              value={newPassword2}
              errors={passwordConfirmationErrors}
              onChange={onPasswordInputChange}
              isRequired={true}
            />
            <CustomButton
              className="update-password-form__button"
              title={t('profile.changePasswordButtonText')}
              onClick={() => dispatch(ProfileSagaActions.changePassword())}
              buttonHeight={BUTTON_HEIGHT.THIN}
            />
          </div>
        </div>
      </ContentContainer>
    </MainPagesContainer>
  );
};

export default ProfilePage;
