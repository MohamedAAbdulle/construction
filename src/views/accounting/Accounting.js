import React from "react";
import AccountingHead from "./AccountingHead";
import AccountingTable from "./AccountingTable";
import "./accounting.css";
import { AccountingContx } from "./AccountingContx";

const Accounting = () => {
  return (
    <div>
      <AccountingContx>
        <AccountingHead />
        <AccountingTable />
      </AccountingContx>
    </div>
  );
};

export default Accounting;
