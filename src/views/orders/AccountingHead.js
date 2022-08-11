import React from "react";
import { TextField, Grid, MenuItem} from "@material-ui/core";
import { accountTypesEnums } from "utils/enums";
import { accountingContx } from "views/orders/AccountingContx";
import StickySlider from "components/sliderModal/StickySlider";
import OrderForm from "./OrderForm";
import BtnComp from "components/btn-comp/BtnComp";

const AccountingHead = () => {
  const { filterAccounts } = React.useContext(accountingContx);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2 className="page-title">Orders</h2>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            size="small"
            select
            label="Filter Orders"
            //style={{ width: 150 }}
            onChange={filterAccounts}
            id="filter-select"
          >
            {["All", ...accountTypesEnums].map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item>
          <BtnComp label="Create Order" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      <StickySlider clickState={open} setClickState={setOpen}>
        <OrderForm closeSlider={() => setOpen(false)} order={{}} />
      </StickySlider>
    </>
  );
};

export default AccountingHead;
