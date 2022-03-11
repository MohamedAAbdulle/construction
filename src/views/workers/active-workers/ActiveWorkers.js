import React from "react";
import ActiveWorkersTable from "./ActiveWorkersTable";
import ActiveWorkersHeader from "./active-worker-head/ActiveWorkersHeader";
import { workerContext } from "../WorkerContext";

const ActiveWorkers = () => {
  const { getActiveWorkers, activeWeek } = React.useContext(workerContext);

  React.useEffect(() => getActiveWorkers(), [activeWeek]);
  return (
    <div>
      <ActiveWorkersHeader />
      <ActiveWorkersTable />
    </div>
  );
};

export default ActiveWorkers;
