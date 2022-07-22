import React from "react";
import { Button, Grid, IconButton } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import { Add, Close } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import DocumentsComp from "components/documents/DocumentsComp";

const ContractForm = ({ closeSlider, initialContract, formLabel }) => {
  const [state, setState] = React.useState(initialContract);

  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSave = () => {
    console.log(state);
    //postEndpoint("/contracts", state).then(() => getContracts());
  };

  return (
    <div>
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="end">
          <Grid item>{formLabel}</Grid>
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BtnComp label="Save" onClick={onSave} />
              <IconButton onClick={closeSlider}>
                <Close />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="slider-body">
        <div className="card-comp ">
          <div className="card-title"></div>
          <div className="row g-3 ">
            <div className="col-12 col-xxl-5">
              <InputComp
                label="Contractor"
                name="contractor"
                onChange={onChange}
                value={state.contractor}
              />
            </div>
            <div className="col col-12 col-lg-7 col-xxl-4">
              <InputComp
                label="Contract"
                name="contract"
                onChange={onChange}
                value={state.contract}
              />
            </div>
            <div className="col-12 col-lg-5 col-xxl-3">
              <InputComp
                label="totalPrice"
                value={state.totalPrice}
                disabled
                onChange={onChange}
              />
            </div>
            <div className="col-12 col-lg-5 col-xxl-3">
              <InputComp
                label="totalPrice"
                value={state.totalPrice}
                disabled
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
