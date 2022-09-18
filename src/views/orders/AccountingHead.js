import React from "react";
import { TextField, Grid, MenuItem } from "@material-ui/core";
import { orderStatus } from "utils/enums";
import { accountingContx } from "views/orders/AccountingContx";
import StickySlider from "components/sliderModal/StickySlider";
import OrderForm from "./OrderForm";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";

const AccountingHead = () => {
  const { filterAccounts } = React.useContext(accountingContx);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="page-title">Orders</div>

        {/* <TextField
          variant="outlined"
          size="small"
          select
          label="Filter Orders"
          //style={{ width: 150 }}
          onChange={filterAccounts}
          id="filter-select"
        >
          {["All", ...orderStatus].map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField> */}
        <div className="filter-select">
          <InputComp
            type="select"
            options={orderStatus}
            placeholder="Filter Order"
          />
        </div>
        <BtnComp label="Create Order" onClick={() => setOpen(true)} />
      </div>
      <StickySlider clickState={open} setClickState={setOpen}>
        <OrderForm closeSlider={() => setOpen(false)} order={{}} />
      </StickySlider>
    </>
  );
};

export default AccountingHead;
