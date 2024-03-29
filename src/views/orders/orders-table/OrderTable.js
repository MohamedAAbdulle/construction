import Ellipsis from "components/ellipsis/Ellipsis";
import React from "react";
import { accountingContx } from "views/orders/AccountingContx";
import ConfirmationModal from "components/delete-modal/ConfirmationModal";
import { deleteEndpoint, putEndpoint } from "services/apiFunctions";
import { appContext } from "AppContext";
import OrderForm from "../OrderForm";
import OrderDocs from "../models/OrderDocs";
import { FiEdit } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { ImUndo2 } from "react-icons/im";
import { RiShareForwardFill } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { dateFormatter2 } from "utils/dateFormatter";
import { orderStatus } from "utils/enums";
import assignColor from "utils/assignColors";
import DataTable from "react-data-table-component";
import orderColumns from "./orderColumns";
import orderColumnsPhone from "./orderColumnsPhone";

const OrderTable = () => {
  const { invList, suppliers } = React.useContext(appContext);
  const { accounts, getAccounts } = React.useContext(accountingContx);

  //const [OpenUpdateStatus, setOpenUpdateStatus] = React.useState(false);

  const [modal, setModal] = React.useState({ type: "", state: "" });

  const closeModal = () => {
    setModal({ type: "", state: "" });
  };

  const deleteOrder = (id) => {
    deleteEndpoint(`/orders/${id}`).then(() => {
      getAccounts();
      closeModal();
    });
  };

  const updateStatus = (id) => {
    putEndpoint(`/Orders/statusUpdate/${id}`).then(() => {
      getAccounts();
      //setOpenUpdateStatus(false);
    });
  };
  const undoStatus = (id) => {
    putEndpoint(`/Orders/undoStatus/${id}`).then(() => {
      getAccounts();
      //setOpenUpdateStatus(false);
    });
  };

  const findElement = (id, type) => {
    let element = {};
    let list = type === "inventory" ? invList : suppliers;
    list = list ? list : [];

    element = list.find((i) => i.id === id) || {};

    return element;
  };

  const data = accounts.map((r) => {
    let invInfo = findElement(r.inventoryId, "inventory");
    let supplierInfo = findElement(r.supplierId, "suppliers");
    r.supplierName = supplierInfo.name;
    r.inventoryName = invInfo.name;
    let _status = r.status;
    let colorList = ["orange", "yellow", "green"];
    let statusIndex = orderStatus.indexOf(_status);
    let nextStep =
      statusIndex < 2 && statusIndex > -1
        ? orderStatus[statusIndex + 1]
        : undefined;
    let prevStep = statusIndex > 0 ? orderStatus[statusIndex - 1] : undefined;

    return {
      inventory: r.inventoryName,
      supplier: r.supplierName,
      quantity: r.quantity,
      price: r.price,
      dateDone: dateFormatter2(r.dateDone, "DD MMM 'YY, HH:mm"),
      status: (
        <div className={assignColor(orderStatus, colorList, _status)}>
          {r.status}
        </div>
      ),
      actions: (
        <div className="table-actions">
          <Ellipsis
            menus={[
              {
                onClick: () => {
                  setModal({ type: "edit", state: r });
                },
                label: "Edit",
                icon: <FiEdit />,
              },
              {
                onClick: () => {
                  setModal({ type: "docs", state: r });
                },
                label: "Documents",
                icon: <CgFileDocument />,
              },
              nextStep && {
                onClick: () => {
                  updateStatus(r.id);
                  //setOpenUpdateStatus(r.id);
                },
                label: nextStep,
                icon: <RiShareForwardFill />,
              },
              prevStep && {
                onClick: () => {
                  undoStatus(r.id);
                },
                label: prevStep,
                icon: <ImUndo2 />,
                classes: "red",
              },
              {
                onClick: () => {
                  setModal({ type: "delete-order", state: r.id });
                },
                label: "Delete",
                icon: <MdOutlineDeleteForever />,
                classes: "red",
              },
            ]}
          ></Ellipsis>
        </div>
      ),
    };
  });

  return (
    <>
      <div className="summary-list desktop-only">
        <DataTable columns={orderColumns} data={data} />
      </div>
      <div className="summary-list phone-only">
        <DataTable columns={orderColumnsPhone} data={data} />
      </div>

      {modal.type === "delete-order" && (
        <ConfirmationModal
          onClose={closeModal}
          deleteAction={() => deleteOrder(modal.state)}
          message={`This order will be permanently deleted!`}
          title="Delete Order"
        />
      )}

      {modal.type === "docs" && (
        <OrderDocs closeModal={closeModal} order={modal.state} />
      )}
      {modal.type === "edit" && (
        <OrderForm closeModal={closeModal} order={modal.state} />
      )}
    </>
  );
};

export default OrderTable;
