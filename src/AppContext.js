import history from "data/history";
import _activeWorkers from "data/activeWorkers";
import accounting from "data/accounting";
import inventory from "data/inventory";
import contracts from "data/contracts";
import React, { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const appContext = React.createContext();
const AppContext = (props) => {
  //database
  const [invHistory, setInvHistory] = useState(history);
  const [accountingList, setAccountingList] = useState(accounting);
  const [invList, setInvList] = useState(inventory);
  const [contractList, setContractList] = useState(contracts);
  const [activeWorkers, setActiveWorkers] = useState(_activeWorkers);

  const findError = (list, requiredProps) => {
    const errors = requiredProps.filter((r) => !list[r]);
    console.log(errors);
    return errors;
  };
  //endpoints
  const getEndpoint = (url, pos) => {
    console.log(url);
    let id;
    if (pos) {
      let a = url.split("/");
      id = a.pop();
      url = a.join("/");
    }

    console.log(url);
    return new Promise((a, b) => {
      switch (url) {
        case "/inventory":
          a(JSON.parse(JSON.stringify(invList)));
          break;
        case "/active-workers":
          a(JSON.parse(JSON.stringify(activeWorkers)));
          break;
        case "/accounting":
          a(JSON.parse(JSON.stringify(accountingList)));
          break;
        case "/invhistory":
          a(invHistory.filter((inv) => inv.invId === parseInt(id)));
          break;
        case "/contracts":
          console.log(contractList);
          a(contractList);
          break;
        default:
          b([]);
      }
    });
  };

  const fetchPost = (url, body, pos) => {
    let errors = [];
    url = pos ? url.split("/").slice(0, pos).join("/") : url;
    const newId = moment().format("yyyy-MM-DDThh:mm");
    return new Promise((a, b) => {
      switch (url) {
        case "/inventory":
          errors = findError(body, ["name", "quantity", "unit", "threshold"]);
          if (errors.length) {
            b({ status: 400, title: "Validation Errors", errors });
            return;
          } else {
            setInvList((prev) => {
              let c = { ...body, id: newId, dateModified: newId };
              prev.unshift(c);
              return prev;
            });
            setInvHistory((prev) => [
              {
                id: 1,
                invId: 1,
                quantity: 26,
                type: "Removed",
                dateDone: "2022-01-18T15:20",
              },
              ...prev,
            ]);

            a({ status: 200, title: "Inventory created." });
          }

          break;
        case "/inventory/takeout":
          errors = findError(body, ["type", "quantity", "invId"]);
          if (errors.length) {
            b({ status: 400, title: "Validation Errors", errors });
          }
          let i = invList.find((inv) => inv.id === body.invId);
          if (i.quantity < body.quantity) {
            b({ status: 400, title: "Not enought iventory available" });
            return;
          }
          if (i) {
            setInvList((prev) => {
              let i = prev.find(
                (inv) => inv.id.toString() === body.invId.toString()
              );
              i.quantity -= body.quantity;
              i.dateModified = newId;
              return prev;
            });

            setInvHistory((prev) => [{ ...body, id: newId }, ...prev]);
            a({ status: 200, title: "Inventory updated." });
          }
          b({ status: 500, title: "Uncaught error" });
          break;

        case "/inventory/addmore":
          errors = findError(body, [
            "price",
            "quantity",
            "invId",
            "supplierName",
            "status",
            "type",
          ]);
          if (errors.length) {
            console.log("errors");
            b({ status: 400, title: "Validation Errors", errors });
            return;
          }
          let o = invList.find((inv) => inv.id === body.invId);
          if (o) {
            console.log("pass");
            setInvList((prev) => {
              let i = prev.find(
                (inv) => inv.id.toString() === body.invId.toString()
              );
              i.quantity += parseInt(body.quantity);
              i.dateModified = newId;
              return prev;
            });
            setAccountingList([body, ...accountingList]);

            setInvHistory((prev) => [{ ...body, id: newId }, ...prev]);
            a({ status: 200, title: "Inventory updated." });
          }
          b({ status: 500, title: "Uncaught error" });
          break;
        case "/contracts":
          console.log(body);
          const { contract, contractor, totalPrice } = body;
          const aaa = {
            id: newId,
            contract,
            contractor,
            totalPrice,
            dateModified: newId,
          };
          setContractList((prev) => {
            prev.push(aaa);
          });
          a({ status: 200, title: "Inventory updated." });
          break;
        default:
          return "failed";
      }
    });
  };

  const putEndpoint = async (url, body) => {
    switch (url) {
      case "inventory":
        console.log(body);
        return 4535;
      default:
        return 5454;
    }
  };

  const postEndpoint = async (url, body, pos) =>
    new Promise((a, b) =>
      fetchPost(url, body, pos)
        .then((res) => {
          toast.success(res.title);
          a();
        })
        .catch((res) => {
          toast.error(res.title);
          b(res.errors || []);
        })
    );

  //React.useEffect(() => console.log(invList), [invList]);

  return (
    <appContext.Provider value={{ getEndpoint, postEndpoint, putEndpoint }}>
      {props.children}
    </appContext.Provider>
  );
};

export { AppContext, appContext };
