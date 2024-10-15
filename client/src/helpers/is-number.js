export const isNumber = (str) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};
