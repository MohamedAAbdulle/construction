import {  Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import StickySlider from "components/sliderModal/StickySlider";
import React from "react";
import ContractTab from "../ContractsTab";
import NewContrator from "./contractor-form/NewContractor";

const ContractorsHead = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <ContractTab />
        </Grid>
        {/* <Grid item>
          <InputComp postfix={<Search />} placeholder="Search Contracts" />
        </Grid> */}

        <Grid item>
          <BtnComp onClick={() => setOpen(true)} label="New Contractor" />
        </Grid>
      </Grid>
      <StickySlider clickState={open} setClickState={setOpen}>
        <NewContrator closeSlider={() => setOpen(false)} />
      </StickySlider>
    </>
  );
};

export default ContractorsHead;
