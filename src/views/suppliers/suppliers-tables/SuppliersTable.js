import ConfirmationModal from "components/delete-modal/ConfirmationModal";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { deleteEndpoint } from "services/apiFunctions";
import SupplierForm from "views/suppliers/SupplierForm";
import supplierColumns from "./supplierColumns";
import supplierColumnsPhone from "./supplierColumnsPhone";

const SuppliersTable = ({ getSuppliers, suppliers }) => {
  const [openDeleteSupplier, setOpenDeleteSupplier] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const deleteSupplier = (id) => {
    deleteEndpoint(`/suppliers/${id}`).then(() => {
      getSuppliers();
      setOpenDeleteSupplier(false);
    });
  };

  const data = suppliers.map((r) => ({
    name: r.name,
    address: r.address,
    phone: r.phone,
    email: r.email,
    actions: (
      <div className="table-actions">
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
        ></Ellipsis>
      </div>
    ),
  }));

  return (
    <>
      <div className="summary-list desktop-only">
        <DataTable columns={supplierColumns} data={data} />
      </div>
      <div className="summary-list phone-only">
        <DataTable columns={supplierColumnsPhone} data={data} />
      </div>

      {openDeleteSupplier && (
        <ConfirmationModal
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
