import Ellipsis from "components/ellipsis/Ellipsis";
import TableCont from "components/table-comp/TableCont";
import React from "react";
import { accountingContx } from "views/orders/AccountingContx";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint } from "services/apiFunctions";
import dayjs from "dayjs";
import { appContext } from "AppContext";
import StickySlider from "components/sliderModal/StickySlider";
import OrderForm from "./OrderForm";

const AccountingTable = () => {
  const { invList, suppliers } = React.useContext(appContext);
  const { accounts, getAccounts } = React.useContext(accountingContx);

  const [openDeleteOrder, setOpenDeleteOrder] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const deleteOrder = (id) => {
    deleteEndpoint(`/orders/${id}`).then(() => {
      getAccounts();
      setOpenDeleteOrder(false);
    });
  };

  const findElement = (id, type) => {
    let objToReturn = {};
    let element;
    element =
      type === "inventory"
        ? invList.find((i) => i.id === id)
        : type === "suppliers"
        ? suppliers.find((i) => i.id === id)
        : {};
    if (element) {
      objToReturn = element;
    }
    return objToReturn;
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
      <div>{dayjs(r.dateDone).format("DD-MM-YY, HH:mm")}</div>,
      <div className={r.status}>{r.status}</div>,
      <Ellipsis
        menus={[
          {
            onClick: () => setOpenEdit(r),
            label: "Edit",
          },
          {
            onClick: () => {
              setOpenDeleteOrder(r.id);
            },
            label: "Delete",
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
      {openDeleteOrder && (
        <DeleteModal
          onClose={() => setOpenDeleteOrder(false)}
          deleteAction={() => deleteOrder(openDeleteOrder)}
          message={`This order will be permanently deleted!`}
          title="Delete Order"
        />
      )}
      <StickySlider clickState={openEdit} setClickState={setOpenEdit}>
        <OrderForm closeSlider={() => setOpenEdit(false)} order={openEdit} />
      </StickySlider>
    </>
  );
};

export default AccountingTable;
