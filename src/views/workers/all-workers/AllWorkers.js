import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import { workerContext } from "../WorkerContext";
import AllWorkersHeader from "./all-workers-header/AllWorkersHeader";
import AllWorkersTable from "./all-workers-table/AllWorkerTable";

const AllWorkers = () => {
  const { allWorkers } = React.useContext(workerContext);
  return (
    <div>
      <AllWorkersHeader />
      {fetchStatus(
        allWorkers,
        () => (
          <AllWorkersTable />
        ),
        "No Workers"
      )}
    </div>
  );
};

export default AllWorkers;
