import React from "react";
import { inventoryStatus } from "utils/enums";
import "./Inventory.css";
import DailyUse from "./modals/DailyUse";
import InvHistory from "./modals/InvHistory";
import Ellipsis from "components/ellipsis/Ellipsis";
import DeleteInv from "./modals/DeleteInv";
import EditInv from "./modals/EditInv";
import dateFormatter from "utils/dateFormatter";
import { FiChevronsRight } from "react-icons/fi";
import { MdHistoryToggleOff } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import InvCorrection from "./modals/InvCorrection";
import invTableColumns, { invTableColumnsPhone } from "./InvTableColumns";
import DataTable from "react-data-table-component";

const InventoryTable = ({ invList }) => {
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

  const aa = invList.map((inv) => ({
    name: inv.name,
    unit: inv.unit,
    quantity: inv.quantity,
    status: getInventoryStatus(inv),
    modifiedDate: dateFormatter(inv.modifiedDate, "DD MMM 'YY, HH:mm"),
    //for phone display
    modifiedDateOnly: dateFormatter(inv.modifiedDate, "DD MMM 'YY"),
    modifiedTime: dateFormatter(inv.modifiedDate, "HH:mm"),
    actions: (
      <div className="table-actions">
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
              icon: <FiEdit />,
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
        />
      </div>
    ),
  }));

  return (
    <>
      <div className="summary-list desktop-only">
        <DataTable columns={invTableColumns} data={aa} />
      </div>

      <div className="summary-list phone-only">
        <DataTable columns={invTableColumnsPhone} data={aa} />
      </div>

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
};

export default InventoryTable;
