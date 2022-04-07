const findEnumName = (enumValue, enumType) => {
  let f = enumType.find((i) => i.keyValue === enumValue);
  if (f) return f.keyName;
  else return enumValue;
};

const findWorkerTypeName = (typeValue, enumType) => {
  let f = enumType.find((i) => i.typeValue === typeValue);
  if (f) return f.typeName;
  else return typeValue;
};
export const findWorkerTypeRate = (typeValue, enumType) => {
  let f = enumType.find((i) => i.typeValue === typeValue);
  if (f) return f.rate;
  else return 0;
};

export default findWorkerTypeName;
