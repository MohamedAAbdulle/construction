import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import StickySlider from "components/sliderModal/StickySlider";
import dayjs from "dayjs";
import React from "react";
import ActivityDateRange from "./activity-date-range/ActivityDateRange";
import NewActiveWorkerSlider from "./create-active-worker/NewActiveWorkerSlider";

const ActiveWorkersHeader = () => {
  const [activeWeek, setActiveWeek] = React.useState(dayjs().day(1));
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
          <ActivityDateRange
            activeWeek={activeWeek}
            setActiveWeek={setActiveWeek}
          />
        </Grid>

        <Grid item>
          <BtnComp
            label="New Active Worker"
            onClick={() => {
              setOpenNewActive(true);
            }}
          />
        </Grid>
      </Grid>
      <StickySlider clickState={openNewActive} setClickState={setOpenNewActive}>
        <NewActiveWorkerSlider setOpenNewActive={setOpenNewActive} />
      </StickySlider>
    </div>
  );
};

export default ActiveWorkersHeader;
