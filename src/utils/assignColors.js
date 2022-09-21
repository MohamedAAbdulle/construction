const assignColor = (statusList, colorList, _status) => {
  let selectedColor;
  statusList.forEach((item, index) => {
    if (item === _status) selectedColor = colorList[index];
  });
  return selectedColor;
};

export default assignColor;
