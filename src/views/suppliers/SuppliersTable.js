import DeleteModal from "components/delete-modal/DeleteModal";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import TableCont from "components/table-comp/TableCont";
import React, { useState } from "react";
import { deleteEndpoint } from "services/apiFunctions";
import SupplierForm from "views/suppliers/SupplierForm";

const SuppliersTable = ({ getSuppliers, suppliers }) => {
  const [openDeleteSupplier, setOpenDeleteSupplier] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const deleteSupplier = (id) => {
    deleteEndpoint(`/suppliers/${id}`).then(() => {
      getSuppliers();
      setOpenDeleteSupplier(false);
    });
  };

  const data = suppliers.map((r) => {
    return [
      <div>{r.name}</div>,
      <div>{r.address}</div>,
      <div>{r.phone}</div>,
      <div>{r.email}</div>,
      <Ellipsis
        menus={[
          {
            onClick: () => setOpenEdit(r),
            label: "Edit",
          },
          {
            onClick: () => setOpenDeleteSupplier(r.id),
            label: "Delete",
          },
        ]}
      ></Ellipsis>,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={["Supplier Name", "Address", "Phone", "Email", ""]}
        dataList={data}
      />

      {openDeleteSupplier && (
        <DeleteModal
          onClose={() => setOpenDeleteSupplier(false)}
          deleteAction={() => deleteSupplier(openDeleteSupplier)}
          message={`This Supplier will be permanently deleted!`}
          title="Delete Supplier"
        />
      )}
      <StickySlider clickState={Boolean(openEdit)} setClickState={setOpenEdit}>
        <SupplierForm
          closeSlider={() => setOpenEdit(false)}
          supplier={openEdit}
        />
      </StickySlider>
    </>
  );
};

export default SuppliersTable;
