import { Button, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import InputComp from "components/input/InputComp";
import StickySlider from "components/sliderModal/StickySlider";
import React from "react";
import ContractTab from "../ContractsTab";
import NewContract from "./contract-form/NewContract";

const ContractHead = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <ContractTab />
        </Grid>
        <Grid item>
          <InputComp postfix={<Search />} placeholder="Search Contracts" />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setOpen(true)}
          >
            Create Contract
          </Button>
        </Grid>
      </Grid>
      <StickySlider clickState={open} setClickState={setOpen}>
        <NewContract closeSlider={() => setOpen(false)} />
      </StickySlider>
    </>
  );
};

export default ContractHead;
