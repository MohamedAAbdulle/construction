export const digitsToCurrency = (digits) => {
  let a = parseFloat(digits);
  return a.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
