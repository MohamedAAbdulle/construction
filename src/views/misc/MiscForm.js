import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import findError from "utils/findError";
import onChangeSimple from "utils/onChangeSimple";

const MiscForm = ({ closeSlider, misc, errors }) => {
  const [state, setState] = React.useState(misc || {});
  const onSave = () => {};

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };
  return (
    <div className="summary-list">
      <div className="slider-header d-flex align-items-center">
        <div>Misc Form</div>
        <div className="d-flex align-items-center">
          <BtnComp label="Save" onClick={onSave} />
          <IconButton onClick={closeSlider}>
            <Close className="negative-action" />
          </IconButton>
        </div>
      </div>

      <div className="slider-body">
        <div className="card-comp">
          <div className="card-title">Misc Info</div>
          <div className="row gy-3">
            <div className="col-12 col-lg-6">
              <InputComp
                label="Price"
                onChange={onChanged}
                value={state.price}
                name="price"
                error={findError("price", errors)}
              />
            </div>
            <div className="col-12 col-lg-6">
              <InputComp
                label="Type"
                onChange={onChanged}
                value={state.type}
                name="type"
                error={findError("type", errors)}
              />
            </div>
            <div className="col-12">
              <InputComp
                label="Description"
                type="textarea"
                name="description"
                onChange={onChanged}
                value={state.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiscForm;
