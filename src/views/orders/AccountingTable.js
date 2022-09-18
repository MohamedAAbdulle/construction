import Ellipsis from "components/ellipsis/Ellipsis";
import TableCont from "components/table-comp/TableCont";
import React from "react";
import { accountingContx } from "views/orders/AccountingContx";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint, putEndpoint } from "services/apiFunctions";
import { appContext } from "AppContext";
import StickySlider from "components/sliderModal/StickySlider";
import OrderForm from "./OrderForm";
import OrderDocs from "./models/OrderDocs";
import { TbEdit } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { ImUndo2 } from "react-icons/im";
import { RiShareForwardFill } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import dateFormatter from "utils/dateFormatter";

//import {} from "react-icons/hi";

const AccountingTable = () => {
  const { invList, suppliers } = React.useContext(appContext);
  const { accounts, getAccounts } = React.useContext(accountingContx);
  
  //const [OpenUpdateStatus, setOpenUpdateStatus] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);

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
    return [
      <div>{r.inventoryName}</div>,
      <div>{r.supplierName}</div>,
      <div>{r.quantity}</div>,
      <div>{r.price}</div>,
      <div>{ dateFormatter(r.dateDone,"DD MMM 'YY, HH:mm")}</div>,
      <div className={r.status}>{r.status}</div>,
      <Ellipsis
        menus={[
          {
            onClick: () => setOpenEdit(r),
            label: "Edit",
            icon: <TbEdit />,
          },
          {
            onClick: () => {
              setModal({ type: "docs", state: r });
            },
            label: "Documents",
            icon: <CgFileDocument />,
          },
          {
            onClick: () => {
              updateStatus(r.id);
              //setOpenUpdateStatus(r.id);
            },
            label: "Next Step",
            icon: <RiShareForwardFill />,
          },
          {
            onClick: () => {
              undoStatus(r.id);
            },
            label: "Undo Step",
            icon: <ImUndo2 />,
          },
          {
            onClick: () => {
              setModal({ type: "delete-order", state: r.id });
            },
            label: "Delete",
            icon: <MdOutlineDeleteForever/>
          },
        ]}
      ></Ellipsis>,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={[
          "Material",
          "Supplier",
          "Quantity",
          "Price",
          "Date Created",
          "Status",
          "",
        ]}
        dataList={data}
      />

      {modal.type === "delete-order" && (
        <DeleteModal
          onClose={closeModal}
          deleteAction={() => deleteOrder(modal.state)}
          message={`This order will be permanently deleted!`}
          title="Delete Order"
        />
      )}

      {modal.type === "docs" && (
        <OrderDocs closeModal={closeModal} order={modal.state} />
      )}

      <StickySlider clickState={openEdit} setClickState={setOpenEdit}>
        <OrderForm closeSlider={() => setOpenEdit(false)} order={openEdit} />
      </StickySlider>
    </>
  );
};

export default AccountingTable;
