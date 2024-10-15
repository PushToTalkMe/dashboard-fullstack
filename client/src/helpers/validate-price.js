export const validatePrice = (number) => {
  const regex = /^\d+\.\d{2}$/;
  return regex.test(number);
};
