import { appContext } from "AppContext";
import React from "react";
import { getEndpoint } from "services/apiFunctions";

const accountingContx = React.createContext();

const AccountingContx = (props) => {
  const { getInvList, getSuppliers } = React.useContext(appContext);
  const [initialAccount, setInitialAccounts] = React.useState();
  const [accounts, setAccounts] = React.useState();

  const getAccounts = () => {
    getEndpoint("/Orders").then((res) => {
      let data = res.failed ? res : res.reverse();
      setAccounts(data);
      setInitialAccounts(data);
    });
  };

  const filterAccounts = (e) => {
    setAccounts(() => {
      const value = e.target.value;
      if (value === "All") return initialAccount;
      else return initialAccount.filter((a) => a.status === value);
    });
  };

  React.useEffect(() => {
    getAccounts();
    getInvList();
    getSuppliers();
  }, []);

  return (
    <accountingContx.Provider value={{ accounts, getAccounts, filterAccounts }}>
      {props.children}
    </accountingContx.Provider>
  );
};

export { AccountingContx, accountingContx };
