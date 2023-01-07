import React from "react";
import AccountingHead from "./AccountingHead";
import "./accounting.css";
import { accountingContx, AccountingContx } from "./AccountingContx";
import fetchStatus from "components/fetch-status/fetchStatus";
import OrderTable from "./orders-table/OrderTable";

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
          <OrderTable />
        ),
        "No Orders"
      )}
    </>
  );
};

export default Accounting;
