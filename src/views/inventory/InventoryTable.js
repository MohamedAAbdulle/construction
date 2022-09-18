import React from "react";
import { inventoryStatus } from "utils/enums";
import "./Inventory.css";
import DailyUse from "./modals/DailyUse";
import InvHistory from "./modals/InvHistory";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import DeleteInv from "./modals/DeleteInv";
import EditInv from "./modals/EditInv";
import dateFormatter from "utils/dateFormatter";
import { FiChevronsRight } from "react-icons/fi";
import { MdHistoryToggleOff } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import InvCorrection from "./modals/InvCorrection";

export default function Inventory({ invList }) {
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
    setSelectedInv(inv);
    setModal(type);
  };

  const closeModal = () => {
    setModal("");
  };

  return (
    <>
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
          dateFormatter(inv.modifiedDate, "DD MMM 'YY, HH:mm"),
          <Ellipsis
            menus={[
              {
                onClick: () => tableAction("remove", inv),
                label: "Daily Usage",
                icon: <FiChevronsRight />,
              },

              {
                onClick: () => tableAction("add", inv),
                label: "Correction",
                icon: <BsCheck2Circle />,
              },
              {
                onClick: () => tableAction("edit", inv),
                label: "Edit",
                icon: <TbEdit />,
              },
              {
                onClick: () => tableAction("history", inv),
                label: "History",
                icon: <MdHistoryToggleOff />,
              },
              {
                onClick: () => tableAction("delete", inv),
                label: "Delete",
                icon: <MdOutlineDeleteForever />,
              },
            ]}
          />,
        ])}
      />

      {modal === "remove" && (
        <DailyUse open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "add" && (
        <InvCorrection open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "edit" && (
        <EditInv open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "history" && (
        <InvHistory open={true} onClose={closeModal} inv={selectedInv} />
      )}
      {modal === "delete" && (
        <DeleteInv open={true} onClose={closeModal} id={selectedInv.id} />
      )}
    </>
  );
}
