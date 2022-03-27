import { Grid } from "@material-ui/core";
import StickySlider from "components/sliderModal/StickySlider";
import React from "react";
import WorkersTab from "views/workers/workers-tab/WorkersTab";
import ActivityDateRange from "./activity-date-range/ActivityDateRange";
import NewActiveWorkerSlider from "./create-active-worker/NewActiveWorkerSlider";

const ActiveWorkersHeader = () => {
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
          <ActivityDateRange />
        </Grid>

        {/* <Grid item>
          <BtnComp
            label="New Active Worker"
            onClick={() => {
              setOpenNewActive(true);
            }}
          />
        </Grid> */}
      </Grid>
      <StickySlider clickState={openNewActive} setClickState={setOpenNewActive}>
        <NewActiveWorkerSlider setOpenNewActive={setOpenNewActive} />
      </StickySlider>
    </div>
  );
};

export default ActiveWorkersHeader;
