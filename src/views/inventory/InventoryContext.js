import React from "react";
import { getEndpoint } from "services/apiFunctions";

const inventoryContext = React.createContext();

const InventoryContext = (props) => {
  const [invList, setInvList] = React.useState([]);

  const getInvList = () => {
    getEndpoint("/inventory").then((res) => {
      setInvList(res);
    });
  };

  React.useEffect(getInvList, []);

  return (
    <inventoryContext.Provider value={{ invList, getInvList }}>
      {props.children}
    </inventoryContext.Provider>
  );
};

export { InventoryContext, inventoryContext };
