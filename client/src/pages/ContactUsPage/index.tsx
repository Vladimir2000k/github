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
import Contact_us_page_image from '../../resources/images/Contact_us_page_image.png';
import {ContactUsActions} from '../../store/common/reducerActions';
import {ContactUsSagaActions} from '../../store/common/sagaActions';
import {
  selectContactUsFormFieldsData,
  selectContactUsPageErrorsData,
} from '../../store/contactUs/selectors';
import {CONTACT_US_PAGE_ERRORS_SECTIONS} from '../../store/contactUs/types';

const ContactUsContentContainer = styled(LandingPagesContentContainer)`
  position: relative;
  margin-top: 73px;
  margin-left: 45px;
`;

const ContactUsPageHeadingText = styled(TextBlock)`
  line-height: 40px;
`;

const ContactUsPageLead = styled(TextBlock)`
  white-space: pre-line;
  margin-top: 20px;
  font-size: 16px;
  color: #848199;
`;

const ContactUsFormContainer = styled.div`
  margin-top: 20px;
  max-width: 525px;

  .non-field-errors {
    margin-top: 20px;
  }
`;

const ContactUsFormRequiredFieldsNotification = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: #848199;
`;

const ContactUsFormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

const ContactUsSubmitFormButton = styled(CustomButton)`
  margin-top: 20px;
`;

const ContactUsPageImage = styled(OptimizedPNGImage)`
  position: absolute;
  top: 52px;
  right: 0;
  z-index: -50;
  height: 376px;
  width: 520px;
`;

const ContactUsPage = (): JSX.Element => {
  const formFieldsData = useSelector(selectContactUsFormFieldsData);
  const errorsData = useSelector(selectContactUsPageErrorsData);

  const dispatch = useDispatch();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(ContactUsActions.clearFormFieldsData());
    dispatch(ContactUsActions.clearErrorsData());
  }, [dispatch]);

  const handleInputChange = useCallback(
    ({target: {name, value}}) => {
      dispatch(
        ContactUsActions.updateFormFieldsData({
          [name]: value,
        }),
      );
    },
    [dispatch],
  );

  const handleSubmitFormButtonClick = useCallback(() => {
    dispatch(ContactUsSagaActions.sendFeedback());
  }, [dispatch]);

  const generalSectionErrors = errorsData[CONTACT_US_PAGE_ERRORS_SECTIONS.GENERAL];

  return (
    <LandingPagesContainer>
      <Header />
      <ContactUsContentContainer>
        <ContactUsPageHeadingText type={TEXT_BLOCK_TYPE.H1}>
          {t('contactUs.headingText')}
        </ContactUsPageHeadingText>
        <ContactUsPageLead type={TEXT_BLOCK_TYPE.P4}>{t('contactUs.leadText')}</ContactUsPageLead>
        <ContactUsFormContainer>
          <ContactUsFormRequiredFieldsNotification>
            {t('contactUs.formRequiredFieldsNotification')}
          </ContactUsFormRequiredFieldsNotification>
          {!!generalSectionErrors?.nonFieldErrors.length && (
            <ErrorMessage
              className="non-field-errors"
              errors={generalSectionErrors.nonFieldErrors}
            />
          )}
          <ContactUsFormFieldsContainer>
            <CustomInput
              name="name"
              value={formFieldsData.name}
              errors={generalSectionErrors.name}
              placeholder={t('contactUs.nameEntryPlaceholder')}
              onChange={handleInputChange}
              isRequired={true}
            />
            <CustomInput
              name="email"
              value={formFieldsData.email}
              errors={generalSectionErrors.email}
              placeholder={t('contactUs.emailEntryPlaceholder')}
              onChange={handleInputChange}
              isRequired={true}
            />
            <CustomInput
              name="message"
              value={formFieldsData.message}
              errors={generalSectionErrors.message}
              placeholder={t('contactUs.messageEntryPlaceholder')}
              onChange={handleInputChange}
              isRequired={true}
              isMultiline={true}
            />
          </ContactUsFormFieldsContainer>
          <ContactUsSubmitFormButton
            title={t('contactUs.submitFormButtonText')}
            onClick={handleSubmitFormButtonClick}
          />
        </ContactUsFormContainer>
        <ContactUsPageImage src={Contact_us_page_image} />
      </ContactUsContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default ContactUsPage;
