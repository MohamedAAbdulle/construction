import React from "react";
import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import ToolForm from "./ToolForm";
import ToolsTab from "../tools-tab/ToolsTab";

const AllToolsHeader = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ margin: "10px 0 20px" }}
      >
        <Grid item>
          <ToolsTab />
        </Grid>

        <Grid item>
          <BtnComp label="Create Tool" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      {open && <ToolForm closeModal={() => setOpen(false)} state={{}} />}
    </>
  );
};

export default AllToolsHeader;
