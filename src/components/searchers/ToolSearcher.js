import classNames from "classnames";
import React from "react";
import SearchComp from "./SearchComp";

const ToolSearcher = ({ label, onAction, error, value, list }) => {
  const resultFormat = (item) => {
    const remaining = item.quantity - item.inUse;

    return (
      <div
        className={classNames({
          unselected: remaining < 1,
        })}
      >
        {item.name}
        <span className="secondary">Remaining: {remaining}</span>
      </div>
    );
  };

  const disableSelection = (item) => {
    const remaining = item.quantity - item.inUse;
    if (remaining < 1) return true;
  };
  return (
    <SearchComp
      label={label || "Tools"}
      placeholder="Search Tools"
      list={list}
      onAction={onAction}
      resultFormat={resultFormat}
      error={error}
      value={value}
      disableSelection={disableSelection}
    />
  );
};

export default ToolSearcher;
