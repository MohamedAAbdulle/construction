import { appContext } from "AppContext";
import React from "react";

const inventoryContext = React.createContext();

const InventoryContext = (props) => {
  const [invList, setInvList] = React.useState([]);

  const { getEndpoint } = React.useContext(appContext);

  const getInvList = () => {
    getEndpoint("/inventory").then((res) => {
      //console.log(res);
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
