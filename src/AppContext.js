import React from "react";
import { getEndpoint } from "services/apiFunctions";

const appContext = React.createContext();
const AppContext = (props) => {
  const [invList, setInvList] = React.useState();
  const [suppliers, setSuppliers] = React.useState();
  const [WorkerTypes, setWorkerTypes] = React.useState([]);
  const [workers, setWorkers] = React.useState();

  const getWorkerTypes = () => {
    getEndpoint("/Workers/WorkerTypes").then((res) => {
      let data = res.failed ? res : res.reverse();
      setWorkerTypes(data);
    });
  };

  const getInvList = (hardFetch) => {
    (hardFetch || !invList) &&
      getEndpoint("/inventory").then((res) => {
        console.log(res);
        let data = res.failed ? res : res.reverse();
        setInvList(data);
      });
  };
  const getSuppliers = (hardFetch) => {
    (hardFetch || !suppliers) &&
      getEndpoint("/suppliers").then((res) => {
        let data = res.failed ? res : res.reverse();
        setSuppliers(data);
      });
  };

  const getWorkers = (hardFetch) => {
    (hardFetch || !workers) &&
      getEndpoint("/workers").then((res) => {
        let data = res.failed ? res : res.reverse();
        setWorkers(data);
      });
  };

  React.useEffect(() => {
    getWorkerTypes();
  }, []);
  return (
    <appContext.Provider
      value={{
        invList,
        getInvList,
        getSuppliers,
        suppliers,
        WorkerTypes,
        getWorkerTypes,
        workers,
        getWorkers,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export { AppContext, appContext };
