import { appContext } from "AppContext";
import React from "react";
import SearchComp from "./SearchComp";

const Inventorysearcher = ({ label, onAction, error, value }) => {
  const { invList } = React.useContext(appContext);

  const resultFormat = (item) => <div>{item.name}</div>;

  return (
    <SearchComp
      label={label || "Inventory"}
      placeholder="Search Inventory"
      list={invList}
      onAction={onAction}
      resultFormat={resultFormat}
      error={error}
      value={value}
    />
  );
};

export default Inventorysearcher;
