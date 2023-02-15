import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import { Grid } from "@material-ui/core";
import onChangeSimple from "utils/onChangeSimple";
import Inventorysearcher from "components/searchers/InventorySearcher";

const NewQuote = ({ onClose, addQuote }) => {
  const [state, setState] = React.useState({});
  const [unit, setUnit] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };

  const onSave = () => {
    let l = {};
    let a = "This field is required";
    if (state.inventoryId && state.amount && state.price) addQuote(state);
    else {
      if (!state.inventoryId) l.inventoryId = a;
      if (!state.amount) l.amount = a;
      if (!state.price) l.price = a;
      setErrors(l);
    }
  };

  return (
    <ModalCont open={true} onClose={onClose} title="New Quote">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={5}>
          <Inventorysearcher
            label="Inventory"
            onAction={(d) => {
              onChanged({
                target: { value: d.id, name: "inventoryId", type: "number" },
              });
              setUnit(d.unit);
            }}
            error={errors.inventoryId}
          />
        </Grid>
        <Grid item xs={4}>
          <InputComp
            onChange={onChanged}
            value={state.amount}
            label="Amount"
            name="amount"
            type="number"
            postfix={unit}
            error={errors.amount}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <InputComp
            onChange={onChanged}
            value={state.price}
            label="Price"
            name="price"
            type="number"
            error={errors.price}
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

export default NewQuote;
