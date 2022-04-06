import React from "react";
import { getEndpoint } from "services/apiFunctions";

const appContext = React.createContext();
const AppContext = (props) => {
  const [invList, setInvList] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [appEnums, setAppEnums] = React.useState({ WorkerType: [] });
  const [WorkerTypes, setWorkerTypes] = React.useState([]);

  const ccc = (l) => {
    let enums = {};
    l.forEach((_enum) => {
      let enumType = _enum.enumType;
      delete _enum.enumType;
      if (enums[enumType]) {
        enums[enumType] = [...enums[enumType], _enum];
      } else {
        enums[enumType] = [_enum];
      }
    });
    console.log(enums);
    setAppEnums(enums);
  };

  const getEnums = () => {
    getEndpoint("/Settings/Enums").then((res) => {
      ccc(res);
    });
  };

  const getWorkerTypes = () => {
    getEndpoint("/Workers/WorkerTypes").then((res) => {
      console.log(res);
      setWorkerTypes(res);
    });
  };

  const getInvList = () => {
    getEndpoint("/inventory").then((res) => {
      setInvList(res.reverse());
    });
  };
  const getSuppliers = () => {
    getEndpoint("/suppliers").then((res) => {
      setSuppliers(res.reverse());
    });
  };

  React.useEffect(() => {
    getInvList();
    getSuppliers();
    getEnums();
    getWorkerTypes();
  }, []);
  return (
    <appContext.Provider
      value={{
        invList,
        getInvList,
        getSuppliers,
        suppliers,
        appEnums,
        WorkerTypes,
        getEnums,
        getWorkerTypes,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export { AppContext, appContext };
