import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import { Grid } from "@material-ui/core";
import { putEndpoint } from "services/apiFunctions";
import { inventoryContext } from "../InventoryContext";
import onChangeSimple from "utils/onChangeSimple";

const EditInv = ({ open, onClose, inv }) => {
  const { getInvList } = React.useContext(inventoryContext);

  const [state, setState] = React.useState(inv);

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };

  const editAction = () => {
    putEndpoint(`/inventory/${inv.id}`, state).then((res) => {
      console.log(res);
      getInvList();
      onClose();
    });
  };

  return (
    <ModalCont open={open} onClose={onClose} title="Edit Inventory">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.name}
            label="Name"
            name="name"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.unit}
            label="Unit"
            name="unit"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={onChanged}
            value={state.threshold}
            label="Threshold"
            name="threshold"
            type="number"
            required
          />
        </Grid>
      </Grid>
      <div className="modal-btns">
        <BtnComp label="Save" onClick={editAction} />
      </div>
    </ModalCont>
  );
};

export default EditInv;
