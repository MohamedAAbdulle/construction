import React from "react";
import { getEndpoint } from "services/apiFunctions";

const accountingContx = React.createContext();

const AccountingContx = (props) => {
  const [initialAccount, setInitialAccounts] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);

  const getAccounts = () => {
    getEndpoint("/Orders").then((res) => {
      console.log(res);
      setAccounts(res.reverse());
      setInitialAccounts(res.reverse());
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
