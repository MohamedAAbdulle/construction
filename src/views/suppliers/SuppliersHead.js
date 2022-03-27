import { Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import StickySlider from "components/sliderModal/StickySlider";
import SupplierForm from "views/suppliers/SupplierForm";

const SuppliersHead = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ margin: "20px 0 15px" }}
      >
        <Grid item>
          <InputComp postfix={<Search />} placeholder="Search Supplier" />
        </Grid>

        <Grid item>
          <BtnComp label="Create Supplier" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      <StickySlider clickState={open} setClickState={setOpen}>
        <SupplierForm closeSlider={() => setOpen(false)} />
      </StickySlider>
    </>
  );
};

export default SuppliersHead;
