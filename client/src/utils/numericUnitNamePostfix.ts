import {SITE_LANG_OPTIONS} from '../store/appGlobal/types';

/**
 * @param number
 * @param language
 * @param wordForms
 *
 * wordForms receives a string witch will be split into separate words via delimiter ';'
 * wordForms input example for EN: 'view;views'
 * wordForms input example for RU: 'просмотр;просмотра;просмотров'
 */

export const numericUnitNamePostfix = (
  number: number,
  language: SITE_LANG_OPTIONS,
  wordForms: string,
): string => {
  try {
    const remainder100 = Math.abs(number) % 100;
    const reminder10 = remainder100 % 10;

    const wordFormsArray = wordForms.split(';');

    switch (language) {
      case SITE_LANG_OPTIONS.EN:
        if (wordFormsArray.length !== 2) {
          throw new Error(
            `The numericUnitNamePostfix util have received the wordForms with ${wordFormsArray.length} words inside!
            The array should contain 2 elements for ${language} localization!
            The wordForms receives a string witch will be split into separate words via delimiter ';'!
            The wordForms input example for ${language}: 'view;views'`,
          );
        }
        if (number === 1) {
          return wordFormsArray[0];
        }
        return wordFormsArray[1];

      // case SITE_LANG_OPTIONS.RU:
      //   if (wordFormsArray.length !== 3) {
      //     throw new Error(
      //       `The numericUnitNamePostfix util have received the wordForms with ${wordFormsArray.length} words inside!
      //       The array should contain 3 elements for ${language} localization!
      //       The wordForms receives a string witch will be split into separate words via delimiter ';'!
      //       wordForms input example for ${language}: 'просмотр;просмотра;просмотров'`,
      //     );
      //   }
      //
      //   if (remainder100 > 10 && remainder100 < 20) {
      //     return wordFormsArray[2];
      //   } else if (reminder10 > 1 && reminder10 < 5) {
      //     return wordFormsArray[1];
      //   } else if (reminder10 == 1) {
      //     return wordFormsArray[0];
      //   }
      //   return wordFormsArray[2];
    }
  } catch (error) {
    console.log(error);
    return '';
  }
};
