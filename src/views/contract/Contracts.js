import React from "react";
import ContractHead from "./ContractHeader";
import ContractTable from "./ContractTable";
import "./contract.css";
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
