import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import "./new-active-worker.sass";

const NewActiveWorkerSlider = ({ setOpenNewActive }) => {
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
            <InputComp label="First Name" />
            <InputComp label="Last Name" />
          </div>
          <div className="input-pair">
            <InputComp label="First Name" />
            <InputComp label="Last Name" />
          </div>
          <div className="input-pair">
            <InputComp label="First Name" />
            <InputComp label="Last Name" />
          </div>
          <BtnComp label="Activate" />
        </div>
      </div>
    </div>
  );
};

export default NewActiveWorkerSlider;
