import {SITE_LANG_OPTIONS} from '../store/appGlobal/types';

interface LocaleDateArgs {
  creationDate: string;
  language: SITE_LANG_OPTIONS;
  options?: Intl.DateTimeFormatOptions;
}

export const localeDate = ({creationDate, language, options}: LocaleDateArgs): string => {
  const dateString = new Date(Date.parse(creationDate)).toLocaleDateString(language, options);

  switch (language) {
    // case SITE_LANG_OPTIONS.RU:
    //   return dateString.substr(0, dateString.length - 3);
    default:
      return dateString;
  }
};
