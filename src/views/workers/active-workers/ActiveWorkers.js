import React from "react";
import ActiveWorkersTable from "./ActiveWorkersTable";
import ActiveWorkersHeader from "./active-worker-head/ActiveWorkersHeader";
import { workerContext } from "../WorkerContext";
import fetchStatus from "components/fetch-status/fetchStatus";

const ActiveWorkers = () => {
  const {
    activeWorkers,
    allWorkers,
    getActiveWorkers,
    activeWeek,
    totalPay,
    updateTotalPay,
  } = React.useContext(workerContext);

  const setUp = () => {
    getActiveWorkers();
  };

  React.useEffect(setUp, [activeWeek]);

  return (
    <div>
      <ActiveWorkersHeader totalPay={totalPay} activeWorkers={activeWorkers} />
      {fetchStatus(
        activeWorkers,
        () => (
          <ActiveWorkersTable
            updateTotalPay={updateTotalPay}
            activeWorkers={activeWorkers}
            allWorkers={allWorkers}
            getActiveWorkers={getActiveWorkers}
          />
        ),
        "No Active Worker"
      )}
    </div>
  );
};

export default ActiveWorkers;
