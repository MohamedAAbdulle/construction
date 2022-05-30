import dayjs from "dayjs";
import React from "react";
import { getEndpoint } from "services/apiFunctions";

const workerContext = React.createContext();

const WorkerContext = (props) => {
  const [activeWorkers, setActiveWorkers] = React.useState();
  const [allWorkers, setAllWorkers] = React.useState();
  const [activeWeek, setActiveWeek] = React.useState(
    dayjs().subtract(1, "days").day(1)
  );
  const [activeTab, setActiveTab] = React.useState(1);

  const getAllWorkers = () => {
    getEndpoint("/workers").then((res) => {
      let data = res.failed ? res : res.reverse();
      setAllWorkers(data);
    });
  };

  const getActiveWorkers = () => {
    getEndpoint(
      `/workers/activeWorkers?weekof=${activeWeek.format("MM-DD-YYYY")}`
    ).then((res) => {
      let data = res.failed ? res : res.reverse();
      setActiveWorkers(data);
    });
  };

  React.useEffect(() => {
    getAllWorkers();
    //getActiveWorkers();
  }, []);

  return (
    <workerContext.Provider
      value={{
        activeWorkers,
        allWorkers,
        activeTab,
        activeWeek,
        getActiveWorkers,
        getAllWorkers,
        setActiveTab,
        setActiveWeek,
      }}
    >
      {props.children}
    </workerContext.Provider>
  );
};

export { WorkerContext, workerContext };
