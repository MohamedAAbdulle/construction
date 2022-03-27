const findEnumName = (enumValue, enumType) => {
  let f = enumType.find((i) => i.keyValue == enumValue);
  if (f) return f.keyName;
  else return enumValue;
};

export default findEnumName;
