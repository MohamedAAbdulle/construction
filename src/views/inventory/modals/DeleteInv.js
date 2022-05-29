import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { deleteEndpoint } from "services/apiFunctions";
import BtnComp from "components/btn-comp/BtnComp";
import { appContext } from "AppContext";

const DeleteInv = ({ open, id, onClose }) => {
  const { getInvList } = React.useContext(appContext);

  const deleteInv = () => {
    deleteEndpoint(`/inventory/${id}`).then(() => {
      getInvList(true);
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
