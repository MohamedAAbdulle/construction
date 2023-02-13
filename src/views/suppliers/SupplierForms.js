import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import { Grid } from "@material-ui/core";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import { appContext } from "AppContext";
import findError from "utils/findError";

const SupplierForms = ({ supplier, closeSlider }) => {
  const { getSuppliers } = React.useContext(appContext);
  const [state, setState] = React.useState(supplier || {});
  const [errors, setErrors] = React.useState({});
  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };
  const onSave = () => {
    let saveAction;
    if (state.id) {
      saveAction = putEndpoint(`/suppliers/${state.id}`, state);
    } else {
      saveAction = postEndpoint(`/suppliers`, state);
    }
    saveAction.then((res) => {
      if (res && res.status === 200) {
        getSuppliers(1);
        closeSlider();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };
  return (
    <ModalCont open={true} onClose={closeSlider} title="Supplier Form">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.name}
            label="Name"
            name="name"
            error={findError("Supplier.Name", errors)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.phone}
            label="Phone"
            name="phone"
            type="number"
            error={findError("Supplier.Phone", errors)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.email}
            label="Email"
            name="email"
            error={findError("Supplier.Email", errors)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.address}
            label="Address"
            name="address"
            error={findError("Supplier.Address", errors)}
            required
          />
        </Grid>
      </Grid>
      <div className="modal-btns">
        <BtnComp label="Save" onClick={onSave} />
      </div>
    </ModalCont>
  );
};

export default SupplierForms;
