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
  const { allWorkers } = React.useContext(workerContext);

  const { activeTab } = React.useContext(workerContext);
  return (
    <>
      {allWorkers && (
        <>{activeTab === 1 ? <AllWorkers /> : <ActiveWorkers />}</>
      )}
    </>
  );
};

export default Workers;
