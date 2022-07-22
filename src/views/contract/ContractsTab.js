import React from "react";
import { contractContext } from "./ContractContext";

const ContractTab = () => {
  const { activeTab, setActiveTab } = React.useContext(contractContext);
  return (
    <div className="page-tab">
      <span
        className={activeTab === 1 ? "active" : ""}
        onClick={() => setActiveTab(1)}
      >
        Contracts
      </span>
      <span>/</span>
      <span
        className={activeTab === 2 ? "active" : ""}
        onClick={() => setActiveTab(2)}
      >
        Contractors
      </span>
    </div>
  );
};

export default ContractTab;
