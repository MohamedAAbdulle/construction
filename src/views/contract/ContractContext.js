import contracts from "data/contracts";
import React from "react";

const contractContext = React.createContext();

const ContractContext = (props) => {
  const [contractList, setContractList] = React.useState([]);

  const getContracts = () => {
    setContractList(contracts);
  };

  React.useEffect(getContracts, []);

  return (
    <contractContext.Provider value={{ contractList, getContracts }}>
      {props.children}
    </contractContext.Provider>
  );
};

export { ContractContext, contractContext };
