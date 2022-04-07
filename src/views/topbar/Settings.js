import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import WorkerTypes from "./worker-types/WorkerTypes";

const Settings = ({ closeSlider }) => {
  return (
    <div className="settings">
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="center">
          <Grid item>Settings</Grid>
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={closeSlider}>
                <Close />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="slider-body">
        <WorkerTypes />
      </div>
    </div>
  );
};

export default Settings;
