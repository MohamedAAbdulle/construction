import { appContext } from "AppContext";
import React from "react";

const activeWorkersContext = React.createContext();

const ActiveWorkersContext = (props) => {
  const [activeWorkers, setActiveWorkers] = React.useState([]);

  const { getEndpoint } = React.useContext(appContext);

  const getActiveWorkers = () => {
    getEndpoint("/active-workers").then((res) => {
      console.log(res);
      setActiveWorkers(res);
    });
  };

  React.useEffect(getActiveWorkers, []);

  return (
    <activeWorkersContext.Provider value={{ activeWorkers, getActiveWorkers }}>
      {props.children}
    </activeWorkersContext.Provider>
  );
};

export { ActiveWorkersContext, activeWorkersContext };
