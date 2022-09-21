import React from "react";
import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import NewInUse from "./NewInUse";
import ToolsTab from "../tools-tab/ToolsTab";

const InUseToolsHeader = () => {
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
          <BtnComp label="Assign Tool" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      {open && (
        <NewInUse
          closeModal={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default InUseToolsHeader;
