import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import { contractContext } from "../ContractContext";
import "./contract.sass";
import ContractHead from "./ContractHeader";
import ContractTable from "./ContractTable";

const Contracts = () => {
  const { contracts, getContracts } = React.useContext(contractContext);
  React.useEffect(getContracts, []);
  return (
    <div>
      <ContractHead />
      <br />
      {fetchStatus(
        contracts,
        () => (
          <ContractTable contracts={contracts} />
        ),
        "No Subcontracts"
      )}
    </div>
  );
};

export default Contracts;
