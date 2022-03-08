import React from "react";
import { inventoryStatus } from "utils/enums";
import "./Inventory.css";
import { inventoryContext } from "./InventoryContext";
import AddMore from "./modals/AddMore";
import TakeOut from "./modals/TakeOut";
import InvHistory from "./modals/InvHistory";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import dayjs from "dayjs";
import DeleteInv from "./modals/DeleteInv";
import EditInv from "./modals/EditInv";

export default function Inventory() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { invList } = React.useContext(inventoryContext);

  const getInventoryStatus = (inv) => {
    let a = "";
    if (inv.quantity <= 0) {
      a = inventoryStatus[2];
    } else if (inv.quantity >= inv.threshold) {
      a = inventoryStatus[0];
    } else if (inv.quantity < inv.threshold) {
      a = inventoryStatus[1];
    }
    return <div className={a}>{a}</div>;
  };
  const [modal, setModal] = React.useState("");
  const [selectedInv, setSelectedInv] = React.useState({});

  const tableAction = (type, inv) => {
    setAnchorEl(null);
    setSelectedInv(inv);
    setModal(type);
  };

  const closeModal = () => {
    setModal("");
  };

  return (
    <>
      {invList ? (
        <TableCont
          tableTitles={[
            "Name",
            "Unit",
            "Quantity",
            "Status",
            "Last Modified",
            "",
          ]}
          dataList={invList.map((inv) => [
            inv.name,
            inv.unit,
            inv.quantity,
            getInventoryStatus(inv),
            dayjs(inv.modifiedDate).format("DD-MM-YY, HH:mm"),
            <Ellipsis
              menus={[
                { onClick: () => tableAction("add", inv), label: "Add More" },
                {
                  onClick: () => tableAction("remove", inv),
                  label: "Take Out",
                },
                {
                  onClick: () => tableAction("history", inv),
                  label: "History",
                },
                {
                  onClick: () => tableAction("edit", inv),
                  label: "Edit",
                },
                {
                  onClick: () => tableAction("delete", inv),
                  label: "Delete",
                },
              ]}
            />,
          ])}
        />
      ) : (
        <h4 className="centered">Loading...</h4>
      )}

      {modal === "add" && (
        <AddMore open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "remove" && (
        <TakeOut open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "history" && (
        <InvHistory open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "edit" && (
        <EditInv open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "delete" && (
        <DeleteInv open={true} onClose={closeModal} id={selectedInv.id} />
      )}
    </>
  );
}
