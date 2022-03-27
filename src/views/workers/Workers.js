import React from "react";
import ActiveWorkers from "./active-workers/ActiveWorkers";
import AllWorkers from "./all-workers/AllWorkers";
import { WorkerContext, workerContext } from "./WorkerContext";

const Workers = () => {
  return (
    <WorkerContext>
      <WorkersContent />
    </WorkerContext>
  );
};
const WorkersContent = () => {
  const { getAllWorkers } = React.useContext(workerContext);

  React.useEffect(getAllWorkers, []);
  const { activeTab } = React.useContext(workerContext);
  return activeTab === 1 ? <ActiveWorkers /> : <AllWorkers />;
};

export default Workers;
