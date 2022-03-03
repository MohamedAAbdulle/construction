import { appContext } from "AppContext";
import React from "react";

const contractContext = React.createContext();

const ContractContext = (props) => {
  const [contractList, setContractList] = React.useState([]);

  const { getEndpoint } = React.useContext(appContext);

  const getContracts = () => {
    getEndpoint("/contracts").then((res) => {
      console.log({ "res:": res });
      setContractList(res);
    });
  };

  React.useEffect(getContracts, []);

  return (
    <contractContext.Provider value={{ contractList, getContracts }}>
      {props.children}
    </contractContext.Provider>
  );
};

export { ContractContext, contractContext };
