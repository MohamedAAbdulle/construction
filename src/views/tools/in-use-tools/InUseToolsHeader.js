import React from "react";
import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import NewInUse from "./NewInUse";

const InUseToolsHeader = ({workers}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h2 className="page-title">In Use Tools</h2>
        </Grid>

        <Grid item>
          <BtnComp label="Assign Tool" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>
      {open && <NewInUse closeModal={() => setOpen(false)} state={{}} workers={workers} />}
    </>
  );
};

export default InUseToolsHeader;
