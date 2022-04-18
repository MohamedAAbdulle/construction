import React from "react";
import SearchComp from "./SearchComp";

const WorkerSearcher = ({ label, onAction, error, value, list }) => {
  const resultFormat = (item) => <div>{item.name}</div>;
  

  return (
    <SearchComp
      label={label || "Worker"}
      placeholder="Search Worker"
      list={list}
      onAction={onAction}
      resultFormat={resultFormat}
      error={error}
      value={value}
    />
  );
};

export default WorkerSearcher;
