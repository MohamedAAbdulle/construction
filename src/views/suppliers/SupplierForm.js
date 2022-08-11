import React from "react";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import { Grid, IconButton } from "@material-ui/core";
import { getEndpoint, postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import findError from "utils/findError";
import { Close } from "@material-ui/icons";
import { appContext } from "AppContext";
import Quotes from "./quotes/Quotes";

const SupplierForm = ({ supplier, closeSlider }) => {
  const { invList, getInvList, getSuppliers } = React.useContext(appContext);
  const [errors, setErrors] = React.useState({});

  const [state, setState] = React.useState(supplier || {});
  const [quotes, setQuotes] = React.useState();

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };

  const onSave = () => {
    let saveAction;
    if (state.id) {
      saveAction = putEndpoint(`/suppliers/${state.id}`, {
        supplier: state,
        quotes: [...quotes],
      });
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

  const getQuotes = () => {
    if (state.id) {
      getEndpoint(`/suppliers/${state.id}/quotes`).then((res) => {
        let data = res.failed ? res : res.reverse();
        setQuotes(data);
      });
    }
  };
  React.useEffect(() => {
    getQuotes();
    getInvList();
  }, []);

  return (
    <div>
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="end">
          <Grid item>Supplier Form</Grid>
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
        <div className="card-comp">
          <div className="card-title">Supplier Info</div>
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
        </div>

        {state.id && (
          <Quotes
            quotes={quotes}
            setQuotes={setQuotes}
            invList={invList}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};

export default SupplierForm;
