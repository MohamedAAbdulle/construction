import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import { contractStatus } from "utils/enums";
import BtnComp from "components/btn-comp/BtnComp";
import dateFormatter from "utils/dateFormatter";
import onChangeSimple from "utils/onChangeSimple";
import findError from "utils/findError";

const AddContractItem = ({ onClose, onContractItemChanged, open }) => {
  const contractItemTemplate = {
    name: "",
    price: undefined,
    startDate: "",
    endDate: "",
    status: "Ready",
  };
  const [cont, index] = open;
  const [state, setState] = React.useState(cont || contractItemTemplate);
  const [errors, setErrors] = React.useState([]);
  const onChange = (e) => {

    onChangeSimple(e, state, setState);
    //setState({ ...state, [name]: value });
  };

  const _findError = (error) => {
    return findError(error, errors);
  };

  const customValidation = () => {
    let isThereErrors = false;
    let errorableFields = Object.keys(contractItemTemplate);
    let _errors = {};
    errorableFields.forEach((_field, index) => {
      if (state[_field] || state[_field] === 0)
        _errors[errorableFields[index]] = false;
      else {
        isThereErrors = true;
        _errors[errorableFields[index]] = ["This field is Required"];
      }
    });
    setErrors(_errors);
    return isThereErrors;
  };

  const onSave = () => {
    let isThereErrors = customValidation();
    if (!isThereErrors) {
      if (state === cont) {
      } else {
        let editedAction = "Created";
        if (state.id) editedAction = "Modified";
        onContractItemChanged(index, { ...state, editedAction });
      }
      onClose();
    }
  };

  return (
    <div>
      <ModalCont open={true} onClose={onClose} title="Contract Edit">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <InputComp
              label="Name"
              name="name"
              required
              onChange={onChange}
              value={state.name}
              error={_findError("name")}
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
              error={_findError("price")}
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
              error={_findError("status")}
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
              error={_findError("startDate")}
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
              error={_findError("endDate")}
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
