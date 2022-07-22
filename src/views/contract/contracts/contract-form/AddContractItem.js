import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import { contractStatus } from "utils/enums";
import BtnComp from "components/btn-comp/BtnComp";
import dateFormatter from "utils/dateFormatter";

const AddContractItem = ({ onClose, onContractItemChanged, open }) => {
  const [cont, index] = open;
  const [state, setState] = React.useState(cont || {});
  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSave = () => {
    //handle validation
    let _action = "Created";
    if (state.id) _action = "Edited";
    onContractItemChanged(index, { ...state, _action });
    onClose();
  };

  return (
    <div>
      <ModalCont open={true} onClose={onClose} title="Contract Edit">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <InputComp
              label="Name"
              name="title"
              required
              onChange={onChange}
              value={state.title}
            />
          </div>

          <div className="col-12 col-md-4">
            <InputComp
              type="number"
              label="Price"
              name="price"
              value={state.price}
              required
              onChange={onChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <InputComp
              type="select"
              label="Status"
              name="status"
              required
              onChange={onChange}
              options={contractStatus}
              value={state.status}
            />
          </div>
          <div className="col-12 col-md-4">
            <InputComp
              type="date"
              label="Start Date"
              name="startDate"
              required
              onChange={onChange}
              value={dateFormatter(state.startDate, "YYYY-MM-DD")}
            />
          </div>
          <div className="col-12 col-md-4">
            <InputComp
              type="date"
              label="End Date"
              name="endDate"
              required
              onChange={onChange}
              value={dateFormatter(state.endDate, "YYYY-MM-DD")}
            />
          </div>
        </div>
        <div className="modal-btns">
          <BtnComp label="Save" onClick={onSave} />
        </div>
      </ModalCont>
    </div>
  );
};

export default AddContractItem;
