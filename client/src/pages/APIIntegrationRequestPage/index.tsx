import React, {useCallback, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Footer from '../../components/Footer';
import Header from '../../components/LandingHeader';
import LandingPagesContainer from '../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../components/LandingPagesContentContainer';
import OptimizedPNGImage from '../../components/OptimizedPNGImage';
import CustomButton from '../../components/uiKit/Button';
import ErrorMessage from '../../components/uiKit/ErrorMessage';
import CustomInput from '../../components/uiKit/Input';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import API_integration_request_page_image from '../../resources/images/API_integration_request_page_image.png';
import {
  selectAPIIntegrationRequestFormFieldsData,
  selectAPIIntegrationRequestPageErrorsData,
} from '../../store/apiIntegrationRequest/selectors';
import {API_INTEGRATION_REQUEST_PAGE_ERRORS_SECTIONS} from '../../store/apiIntegrationRequest/types';
import {APIIntegrationRequestActions} from '../../store/common/reducerActions';
import {APIIntegrationRequestSagaActions} from '../../store/common/sagaActions';

const APIIntegrationRequestPageContentContainer = styled(LandingPagesContentContainer)`
  position: relative;
  margin-top: 73px;
  margin-left: 45px;
`;

const APIIntegrationRequestPageHeadingText = styled(TextBlock)`
  line-height: 40px;
`;

const APIIntegrationRequestPageLead = styled(TextBlock)`
  white-space: pre-line;
  margin-top: 20px;
  font-size: 16px;
  color: #848199;
`;

const APIIntegrationRequestFormContainer = styled.div`
  margin-top: 45px;
  max-width: 525px;

  .non-field-errors {
    margin-top: 20px;
  }
`;

const APIIntegrationRequestFormRequiredFieldsNotification = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: #848199;
`;

const APIIntegrationRequestFormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

const APIIntegrationRequestSubmitFormButton = styled(CustomButton)`
  margin-top: 20px;
`;

const APIIntegrationRequestPageImage = styled(OptimizedPNGImage)`
  position: absolute;
  top: 52px;
  right: 0;
  z-index: -50;
  height: 376px;
  width: 520px;
`;

const ContactUsPage = (): JSX.Element => {
  const formFieldsData = useSelector(selectAPIIntegrationRequestFormFieldsData);
  const errorsData = useSelector(selectAPIIntegrationRequestPageErrorsData);

  const dispatch = useDispatch();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(APIIntegrationRequestActions.clearFormFieldsData());
    dispatch(APIIntegrationRequestActions.clearErrorsData());
  }, [dispatch]);

  const handleInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        APIIntegrationRequestActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  const handleSubmitFormButtonClick = useCallback(() => {
    dispatch(APIIntegrationRequestSagaActions.sendAPIIntegrationRequest());
  }, [dispatch]);

  const generalSectionErrors = errorsData[API_INTEGRATION_REQUEST_PAGE_ERRORS_SECTIONS.GENERAL];

  return (
    <LandingPagesContainer>
      <Header />
      <APIIntegrationRequestPageContentContainer>
        <APIIntegrationRequestPageHeadingText type={TEXT_BLOCK_TYPE.H1}>
          {t('apiIntegrationRequest.headingText')}
        </APIIntegrationRequestPageHeadingText>
        <APIIntegrationRequestPageLead type={TEXT_BLOCK_TYPE.P4}>
          {t('apiIntegrationRequest.leadText')}
        </APIIntegrationRequestPageLead>
        <APIIntegrationRequestFormContainer>
          <APIIntegrationRequestFormRequiredFieldsNotification>
            {t('apiIntegrationRequest.formRequiredFieldsNotification')}
          </APIIntegrationRequestFormRequiredFieldsNotification>
          {!!generalSectionErrors?.nonFieldErrors.length && (
            <ErrorMessage
              className="non-field-errors"
              errors={generalSectionErrors.nonFieldErrors}
            />
          )}
          <APIIntegrationRequestFormFieldsContainer>
            <CustomInput
              name="name"
              value={formFieldsData.name}
              errors={generalSectionErrors.name}
              placeholder={t('apiIntegrationRequest.nameEntryPlaceholder')}
              onChange={handleInputChange}
              isRequired={true}
            />
            <CustomInput
              name="email"
              value={formFieldsData.email}
              errors={generalSectionErrors.email}
              placeholder={t('apiIntegrationRequest.emailEntryPlaceholder')}
              onChange={handleInputChange}
              isRequired={true}
            />
            <CustomInput
              name="message"
              value={formFieldsData.message}
              errors={generalSectionErrors.message}
              placeholder={t('apiIntegrationRequest.messageEntryPlaceholder')}
              onChange={handleInputChange}
              isRequired={true}
              isMultiline={true}
            />
          </APIIntegrationRequestFormFieldsContainer>
          <APIIntegrationRequestSubmitFormButton
            title={t('apiIntegrationRequest.submitFormButtonText')}
            onClick={handleSubmitFormButtonClick}
          />
        </APIIntegrationRequestFormContainer>
        <APIIntegrationRequestPageImage src={API_integration_request_page_image} />
      </APIIntegrationRequestPageContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default ContactUsPage;
