import dayjs from "dayjs";
import React from "react";
import { getEndpoint } from "services/apiFunctions";

const workerContext = React.createContext();

const WorkerContext = (props) => {
  const [activeWorkers, setActiveWorkers] = React.useState([]);
  const [allWorkers, setAllWorkers] = React.useState([]);
  const [activeWeek, setActiveWeek] = React.useState(dayjs().day(1));
  const [activeTab, setActiveTab] = React.useState(1);

  

  const getAllWorkers = () => {
    getEndpoint("/workers").then((res) => {
      setAllWorkers(res);
    });
  };

  const getActiveWorkers = () => {
    getEndpoint(
      `/workers/activeWorkers?weekof=${activeWeek.format("MM-DD-YYYY")}`
    ).then((res) => {
      setActiveWorkers(res);
    });
  };

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