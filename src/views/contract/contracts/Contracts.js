import React from "react";
import { ContractContext } from "../ContractContext";
import "./contract.sass";
import ContractHead from "./ContractHeader";
import ContractTable from "./ContractTable";

const Contracts = () => {
  return (
    <div>
      <ContractHead />
      <ContractTable />
    </div>
  );
};

export default Contracts;
