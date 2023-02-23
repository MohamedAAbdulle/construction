import { Grid } from "@material-ui/core";
import React from "react";
import { digitsToCurrency } from "utils/currencyFormatter";
import WorkersTab from "views/workers/workers-tab/WorkersTab";
import ActivityDateRange from "./activity-date-range/ActivityDateRange";
import "./active-workers-header.sass";

const ActiveWorkersHeader = ({ totalPay }) => {
  return (
    <span className="active-workers-headers">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="active-workers-header"
      >
        <Grid item>
          <WorkersTab />
        </Grid>

        <Grid item>
          <ActivityDateRange />
        </Grid>

        <Grid item className="active-workers-total-pay">
          <span>
            <span className="red mx-2">Due:</span>
            <span className="red bold">
              {digitsToCurrency(totalPay.totalDues)}
            </span>{" "}
            | <span className="green mx-2">Paid:</span>
            <span className="green bold">
              {digitsToCurrency(totalPay.totalPaid)}
            </span>
          </span>
        </Grid>
      </Grid>
    </span>
  );
};

export default ActiveWorkersHeader;
