const joinStrings = (stringList, separator) => {
  separator = separator || " ";
  stringList = stringList || [];
  let a = stringList.filter((x) => x).join(separator);
  return a;
};
export default joinStrings;
