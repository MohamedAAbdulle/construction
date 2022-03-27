import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import onChangeSimple from "utils/onChangeSimple";
import "./new-active-worker.sass";

const NewActiveWorkerSlider = ({ setOpenNewActive }) => {
  const [worker, setWorker] = React.useState({});
  const changed = (e) => {
    onChangeSimple(e, worker, setWorker);
  };
  const findError = () => {};
  return (
    <div className="new-active-worker">
      <div className="slider-header">
        <div>New Active Worker</div>
        <BtnComp
          type="link"
          label="Cancel"
          onClick={() => setOpenNewActive(false)}
        />
      </div>
      <div className="slider-body">
        <div className="active-mode">
          <InputComp type="search" />
          <span className="or">OR</span>
          <BtnComp label="Create New Worker" />
        </div>
        <div className="worker-info">
          <div className="input-pair">
            <InputComp
              onChange={changed}
              value={worker.name || ""}
              name="name"
              label="Item Name"
              required
              error={findError("Name")}
            />
            <InputComp
              onChange={changed}
              value={worker.idNumber || ""}
              error={findError("IdNumber")}
              name="idNumber"
              type="number"
              required
              label="IdNumber"
            />
          </div>
          <div className="input-pair">
            <InputComp
              onChange={changed}
              value={worker.workerType || ""}
              error={findError("WorkerType")}
              name="workerType"
              type="number"
              required
              label="WorkerType"
            />
            <InputComp
              onChange={changed}
              value={worker.idNumber || ""}
              error={findError("IdNumber")}
              name="idNumber"
              type="number"
              required
              label="IdNumber"
            />
          </div>
          <BtnComp label="Activate" />
        </div>
      </div>
    </div>
  );
};

export default NewActiveWorkerSlider;
