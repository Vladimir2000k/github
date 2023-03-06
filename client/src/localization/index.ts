import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import {EN} from './EN';
// import {RU} from './RU';

const resources = {
  // RU: RU,
  EN: EN,
};

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'EN',
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18next;
