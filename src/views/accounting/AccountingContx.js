import { appContext } from "AppContext";
import React from "react";

const accountingContx = React.createContext();

const AccountingContx = (props) => {
  const { getEndpoint } = React.useContext(appContext);

  const [initialAccount, setInitialAccounts] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);

  const getAccounts = () => {
    getEndpoint("/accounting").then((acc) => {
      console.log(acc);
      setInitialAccounts(acc);
      setAccounts(acc);
    });
  };

  const filterAccounts = (e) => {
    setAccounts(() => {
      const value = e.target.value;
      if (value === "All") return initialAccount;
      else return initialAccount.filter((a) => a.status === value);
    });
  };

  React.useEffect(getAccounts, []);

  return (
    <accountingContx.Provider value={{ accounts, getAccounts, filterAccounts }}>
      {props.children}
    </accountingContx.Provider>
  );
};

export { AccountingContx, accountingContx };
