export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const capitalizeFull = (word: string): string =>
  word[0].toUpperCase() + word.substring(1, word.length).toLowerCase();
