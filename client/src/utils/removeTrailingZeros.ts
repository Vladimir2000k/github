export const removeTrailingZeros = (value: string | number): string => {
  if (typeof value === 'string') return value.replace(/\.?0+$/, '');
  else return value.toString();
};
