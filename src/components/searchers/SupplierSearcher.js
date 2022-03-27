import { appContext } from "AppContext";
import React from "react";
import SearchComp from "./SearchComp";

const SupplierSearcher = ({ label, onAction, error, value }) => {
  const { suppliers } = React.useContext(appContext);

  const resultFormat = (item) => <div>{item.name}</div>;

  return (
    <SearchComp
      label={label || "Suppliers"}
      placeholder="Search Supplier"
      list={suppliers}
      onAction={onAction}
      resultFormat={resultFormat}
      error={error}
      value={value}
    />
  );
};

export default SupplierSearcher;
