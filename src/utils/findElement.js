import React from "react";
import { appContext } from "AppContext";

const FindElement = (id) => {
  const { invList } = React.useContext(appContext);
  let inv = invList.find((i) => i.id === id);
  console.log(invList);
  let l;
  if (inv) {
    l = inv;
  } else {
    l = {};
  }
  return l;
};

export default FindElement;
