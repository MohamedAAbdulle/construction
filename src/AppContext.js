import React from "react";
import { getEndpoint } from "services/apiFunctions";

const appContext = React.createContext();
const AppContext = (props) => {
  const [invList, setInvList] = React.useState();
  const [suppliers, setSuppliers] = React.useState();
  const [WorkerTypes, setWorkerTypes] = React.useState([]);

  const getWorkerTypes = () => {
    getEndpoint("/Workers/WorkerTypes").then((res) => {
      console.log(res);
      setWorkerTypes(res);
    });
  };

  const getInvList = (hardFetch) => {
    (hardFetch || !invList) &&
      getEndpoint("/inventory").then((res) => {
        console.log(res);
        setInvList(res.reverse());
      });
  };
  const getSuppliers = (hardFetch) => {
    (hardFetch || !suppliers) &&
      getEndpoint("/suppliers").then((res) => {
        setSuppliers(res.reverse());
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
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export { AppContext, appContext };
