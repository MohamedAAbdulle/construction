import React from "react";
import { Grid } from "@material-ui/core";
import ToolsTab from "../tools-tab/ToolsTab";

const InUseToolsHeader = () => {

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

        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default InUseToolsHeader;
