import { Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import ContractTab from "../ContractsTab";
import NewContract from "./contract-form/NewContract";

const ContractHead = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container className="d-flex justify-content-between align-items-center py-2">
        <Grid item>
          <ContractTab />
        </Grid>
        {/* <Grid item>
          <InputComp postfix={<Search />} placeholder="Search Contracts" />
        </Grid> */}

        <Grid item>
          <BtnComp label="New Contract" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      {open && <NewContract setOpen={setOpen} open={open} />}
    </>
  );
};

export default ContractHead;
