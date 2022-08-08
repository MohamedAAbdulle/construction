import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import { Close } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import { contractContext } from "views/contract/ContractContext";
import findError from "utils/findError";
import onChangeSimple from "utils/onChangeSimple";

const ContractorForm = ({ closeSlider, initialContract, formLabel }) => {
  const { getContractors } = React.useContext(contractContext);
  const [state, setState] = React.useState(initialContract);
  const [errors, setErrors] = React.useState({});
  const onChange = (e) => {
    onChangeSimple(e, state, setState);
  };

  const onSave = () => {
    console.log(initialContract.id);
    let endPoint = initialContract.id
      ? putEndpoint(`/subcontracts/contractors/${initialContract.id}`, state)
      : postEndpoint("/subcontracts/contractors", state);
    endPoint.then((res) => {
      if (res && res.status === 200) {
        getContractors();
        closeSlider();
      } else if (res && res.errors) {
        console.log(res.errors);
        setErrors(res.errors);
      }
    });
  };

  const _findError = (error) => {
    return findError(error, errors);
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
                error={_findError("Name")}
              />
            </div>
            <div className="col col-12 col-lg-7 col-xxl-4">
              <InputComp
                label="Email"
                name="email"
                onChange={onChange}
                value={state.email}
                error={_findError("Email")}
              />
            </div>
            <div className="col-12 col-lg-5 col-xxl-3">
              <InputComp
                label="Phone"
                value={state.phone}
                type="number"
                name="phone"
                onChange={onChange}
                error={_findError("Phone")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorForm;
