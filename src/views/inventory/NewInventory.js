import React from "react";
import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import { postEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { appContext } from "AppContext";

const NewInventory = ({ open, setOpen }) => {
  const { getInvList } = React.useContext(appContext);

  const [newInv, setNewInv] = React.useState({
    modifiedDate: dayjs().format("YYYY-MM-DDTHH:mm"),
  });
  const [errors, setErrors] = React.useState({});

  const changed = (e) => {
    onChangeSimple(e, newInv, setNewInv);
  };

  const addInventory = () => {
    postEndpoint(`/inventory`, newInv).then((res) => {
      if (res && res.status === 200) {
        setOpen(false);
        getInvList(1);
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };
  const findError = (type) => {
    if (errors[type]) {
      return errors[type][0];
    }
  };

  const closeAction = () => setOpen(false);
  return (
    <>
      <ModalCont open={open} onClose={closeAction} title="New Inventory">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={newInv.name || ""}
              name="name"
              label="Item Name"
              required
              error={findError("Name")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={newInv.unit || ""}
              error={findError("Unit")}
              name="unit"
              required
              label="Unit"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={newInv.quantity || ""}
              name="quantity"
              error={findError("Quantity")}
              label="Quantity"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={newInv.threshold || ""}
              error={findError("Threshold")}
              name="threshold"
              label="Threshold"
              type="number"
            />
          </Grid>
        </Grid>

        <div className="modal-btns">
          <BtnComp label="Save" onClick={addInventory} />
        </div>
      </ModalCont>
    </>
  );
};

export default NewInventory;
