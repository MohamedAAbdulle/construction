import { contractorsD, contractsD } from "data/contracts";
import React from "react";

const contractContext = React.createContext();

const ContractContext = (props) => {
  const [activeTab, setActiveTab] = React.useState(1);

  const [contracts, setContractList] = React.useState();
  const [contractors, setContractors] = React.useState();

  const getContractors = () => {
    setContractors(contractorsD);
  };

  const getContracts = () => {
    setContractList(contractsD);
  };

  React.useEffect(getContractors, []);

  return (
    <contractContext.Provider
      value={{
        contracts,
        contractors,
        activeTab,
        getContracts,
        getContractors,
        setActiveTab,
      }}
    >
      {props.children}
    </contractContext.Provider>
  );
};

export { ContractContext, contractContext };
