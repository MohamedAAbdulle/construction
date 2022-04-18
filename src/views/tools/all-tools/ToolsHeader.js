import React from "react";
import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import ToolForm from "./ToolForm";

const ToolsHeader = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2 className="page-title">Tools</h2>
        </Grid>

        <Grid item>
          <BtnComp label="Create Tool" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      {open && <ToolForm closeModal={() => setOpen(false)} state={{}} />}
    </>
  );
};

export default ToolsHeader;
