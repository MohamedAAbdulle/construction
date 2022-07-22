import React from "react";
import SearchComp from "./SearchComp";

const ContractorSearcher = ({ label, onAction, error, value, list }) => {
  const resultFormat = (item) => <div>{item.name}</div>;
  return (
    <SearchComp
      label={label || "Contractor"}
      placeholder="Search Contractors"
      list={list}
      onAction={onAction}
      resultFormat={resultFormat}
      error={error}
      value={value}
    />
  );
};

export default ContractorSearcher;
