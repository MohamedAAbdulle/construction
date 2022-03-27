import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import WorkersTab from "views/workers/workers-tab/WorkersTab";
import Createworker from "./CreateWorker";

const AllWorkersHeader = () => {
  const [openNewActive, setOpenNewActive] = React.useState(false);

  return (
    <div className="workers-header">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ margin: "20px 0 15px" }}
      >
        <Grid item>
          <WorkersTab />
        </Grid>
        <Grid item>
          <InputComp type="search" placeholder="Search Worker" />
        </Grid>

        <Grid item>
          <BtnComp
            label="Create Worker"
            onClick={() => {
              setOpenNewActive(true);
            }}
          />
        </Grid>
      </Grid>
      {openNewActive && <Createworker open={true} setOpen={setOpenNewActive} />}
    </div>
  );
};

export default AllWorkersHeader;
