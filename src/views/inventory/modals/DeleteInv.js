import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { deleteEndpoint } from "services/apiFunctions";
import { inventoryContext } from "../InventoryContext";
import BtnComp from "components/btn-comp/BtnComp";

const DeleteInv = ({ open, id, onClose }) => {
  const { getInvList } = React.useContext(inventoryContext);

  const deleteInv = () => {
    deleteEndpoint(`/inventory/${id}`).then(() => {
      getInvList();
      onClose();
    });
  };
  return (
    <ModalCont open={open} onClose={onClose} title="Delete Inventory">
      <p>This Inventory will be permanently deleted!</p>
      <div className="modal-btns">
        <BtnComp label="Delete" onClick={deleteInv} />
      </div>
    </ModalCont>
  );
};

export default DeleteInv;
