import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import { Close } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";

const ContractorForm = ({ closeSlider, initialContract, formLabel }) => {
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
          <div className="card-title">Contractor Info</div>
          <div className="row g-3 ">
            <div className="col-12 col-xxl-5">
              <InputComp
                label="Name"
                name="name"
                onChange={onChange}
                value={state.name}
              />
            </div>
            <div className="col col-12 col-lg-7 col-xxl-4">
              <InputComp
                label="Email"
                name="email"
                onChange={onChange}
                value={state.email}
              />
            </div>
            <div className="col-12 col-lg-5 col-xxl-3">
              <InputComp
                label="Phone"
                value={state.phone}
                name="phone"
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

export default ContractorForm;
