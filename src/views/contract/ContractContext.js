import React from "react";
import { getEndpoint } from "services/apiFunctions";

const contractContext = React.createContext();

const ContractContext = (props) => {
  const [activeTab, setActiveTab] = React.useState(1);

  const [contracts, setContractList] = React.useState();
  const [contractors, setContractors] = React.useState();

  const getContractors = () => {
    getEndpoint("/SubContracts/contractors").then((res) => setContractors(res));
  };

  const getContracts = () => {
    getEndpoint("/SubContracts").then((res) => setContractList(res));
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
