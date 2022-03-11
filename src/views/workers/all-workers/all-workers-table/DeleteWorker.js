import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { deleteEndpoint } from "services/apiFunctions";
import BtnComp from "components/btn-comp/BtnComp";
import { workerContext } from "views/workers/WorkerContext";

const DeleteWorker = ({ worker, onClose }) => {
  const { getAllWorkers } = React.useContext(workerContext);

  const deleteWorker = () => {
    deleteEndpoint(`/workers/${worker.id}`).then(() => {
      getAllWorkers();
      onClose();
    });
  };
  return (
    <ModalCont open={true} onClose={onClose} title="Delete Worker">
      <p>{worker.name} will be permanently deleted!</p>
      <div className="modal-btns">
        <BtnComp label="Delete" onClick={deleteWorker} />
      </div>
    </ModalCont>
  );
};

export default DeleteWorker;
