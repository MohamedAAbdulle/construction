import React from "react";
import ActiveWorkersTable from "./ActiveWorkersTable";
import ActiveWorkersHeader from "./active-worker-head/ActiveWorkersHeader";
import { ActiveWorkersContext } from "./ActiveWorkerContext";

const ActiveWorkers = () => {
  return (
    <div>
      <ActiveWorkersContext>
        <ActiveWorkersHeader />
        <ActiveWorkersTable />
      </ActiveWorkersContext>
    </div>
  );
};

export default ActiveWorkers;
