import React from "react";
import OrderForm from "./OrderForm";
import BtnComp from "components/btn-comp/BtnComp";

const AccountingHead = () => {
  //const { filterAccounts } = React.useContext(accountingContx);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="page-title">Orders</div>

        <BtnComp label="New Order" onClick={() => setOpen(true)} />
      </div>
      {open && <OrderForm closeModal={() => setOpen(false)} order={{}} />}
    </>
  );
};

export default AccountingHead;
