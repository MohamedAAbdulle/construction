import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";

const DeleteModal = ({ onClose, deleteAction, title, message, btnTitle="delete" }) => {

  return (
    <ModalCont open={true} onClose={onClose} title={title}>
      <p> {message}</p>
      <div className="modal-btns">
        <BtnComp label={btnTitle} onClick={deleteAction} />
      </div>
    </ModalCont>
  );
};

export default DeleteModal;
