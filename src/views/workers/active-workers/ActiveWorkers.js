import React from "react";
import ActiveWorkersTable from "./ActiveWorkersTable";
import ActiveWorkersHeader from "./active-worker-head/ActiveWorkersHeader";
import { workerContext } from "../WorkerContext";
import fetchStatus from "components/fetch-status/fetchStatus";

const ActiveWorkers = () => {
  const { activeWorkers, allWorkers, getActiveWorkers, activeWeek } =
    React.useContext(workerContext);

  const [totalPay, setTotalPay] = React.useState(0);
  const updateTotalPay = (total) => {
    let a = totalPay + total;
    setTotalPay(100);
  };

  const vv = () => {
    getActiveWorkers();
  };

  React.useEffect(vv, [activeWeek]);

  return (
    <div>
      <ActiveWorkersHeader totalPay={totalPay} />
      {fetchStatus(
        activeWorkers,
        () => (
          <ActiveWorkersTable
            updateTotalPay={setTotalPay}
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
