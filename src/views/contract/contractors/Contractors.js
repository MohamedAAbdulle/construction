import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import { contractContext } from "../ContractContext";
import ContractorsHead from "./ContractorsHeader";
import ContractorsTable from "./ContractorsTable";

const Contractors = () => {
  const { contractors, getContractors } = React.useContext(contractContext);
  React.useEffect(getContractors, []);
  return (
    <div>
      <ContractorsHead />
      <br />
      {fetchStatus(
        contractors,
        () => (
          <ContractorsTable contractors={contractors} />
        ),
        "No Contractors"
      )}
    </div>
  );
};

export default Contractors;
