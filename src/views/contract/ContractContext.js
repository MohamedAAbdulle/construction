import contracts from "data/contracts";
import React from "react";

const contractContext = React.createContext();

const ContractContext = (props) => {
  const [activeTab, setActiveTab] = React.useState(1);
  const aa = (x) => {
    console.log(x);
    setActiveTab(x);
  };

  const [contractList, setContractList] = React.useState([]);

  const getContracts = () => {
    setContractList(contracts);
  };

  React.useEffect(getContracts, []);

  return (
    <contractContext.Provider
      value={{ contractList, getContracts, activeTab, setActiveTab: aa }}
    >
      {props.children}
    </contractContext.Provider>
  );
};

export { ContractContext, contractContext };
