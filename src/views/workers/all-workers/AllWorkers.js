import React from "react";
import { workerContext } from "../WorkerContext";
import AllWorkersHeader from "./all-workers-header/AllWorkersHeader";
import AllWorkersTable from "./all-workers-table/AllWorkerTable";

const AllWorkers = () => {
  const { getAllWorkers } = React.useContext(workerContext);
  React.useEffect(() => getAllWorkers(), []);
  return (
    <div>
      <AllWorkersHeader />
      <AllWorkersTable />
    </div>
  );
};

export default AllWorkers;
