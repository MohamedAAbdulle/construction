import React from "react";
import "./contract.sass";
import ContractHead from "./ContractHeader";
import ContractTable from "./ContractTable";
import { ContractContext } from "./ContractContext";

const Contracts = () => {
  return (
    <div>
      <ContractContext>
        <ContractHead />
        <ContractTable />
      </ContractContext>
    </div>
  );
};

export default Contracts;
