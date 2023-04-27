export const displayNum = function (num) {
  if (num > 1000) return `${num / 1000}k`;
  return num;
};
