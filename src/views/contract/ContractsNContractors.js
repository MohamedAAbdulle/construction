import React from "react";
import { contractContext, ContractContext } from "./ContractContext";
import Contractors from "./contractors/Contractors";
import Contracts from "./contracts/Contracts";

const ContractsNContractors = () => {
  return (
    <ContractContext>
      <ContractsContent />
    </ContractContext>
  );
};
const ContractsContent = () => {
  const { activeTab } = React.useContext(contractContext);
  return activeTab === 1 ? <Contracts /> : <Contractors />;
};

export default ContractsNContractors;
