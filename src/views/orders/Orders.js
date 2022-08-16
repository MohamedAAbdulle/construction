import React from "react";
import AccountingHead from "./AccountingHead";
import AccountingTable from "./AccountingTable";
import "./accounting.css";
import { accountingContx, AccountingContx } from "./AccountingContx";
import fetchStatus from "components/fetch-status/fetchStatus";

const Accounting = () => {
  return (
    <div>
      <AccountingContx>
        <AccountCont />
      </AccountingContx>
    </div>
  );
};

const AccountCont = () => {
  const { accounts } = React.useContext(accountingContx);

  return (
    <>
      <AccountingHead />
      {fetchStatus(
        accounts,
        () => (
          <AccountingTable />
        ),
        "No Orders"
      )}
    </>
  );
};

export default Accounting;
