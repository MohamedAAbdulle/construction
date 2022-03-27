import { Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import NewInventory from "views/inventory/NewInventory";

const InventoryHead = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ margin: "20px 0 15px" }}
    >
      <Grid item>
        <InputComp postfix={<Search />} placeholder="Search Inventory" />
      </Grid>

      <Grid item>
        <BtnComp label="Create Inventory" onClick={() => setOpen(true)} />
      </Grid>
      {open && <NewInventory open={open} setOpen={setOpen} />}
    </Grid>
  );
};

export default InventoryHead;
