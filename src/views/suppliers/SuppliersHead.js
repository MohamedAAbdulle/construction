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
      <div className="d-flex justify-content-between align-items-center py-2">
        <Grid item>
          <div className="page-title">Suppliers</div>
        </Grid>
        <Grid item>
          <InputComp postfix={<Search />} placeholder="Search Supplier" />
        </Grid>

        <Grid item>
          <BtnComp label="Create Supplier" onClick={() => setOpen(true)} />
        </Grid>
      </div>
      <StickySlider clickState={open} setClickState={setOpen}>
        <SupplierForm closeSlider={() => setOpen(false)} />
      </StickySlider>
    </>
  );
};

export default SuppliersHead;
