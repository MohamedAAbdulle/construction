import { Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import Inventorysearcher from "components/searchers/InventorySearcher";
import React, { useState } from "react";
import onChangeSimple from "utils/onChangeSimple";

const NewQuotes = ({ addQuote }) => {
  const initialState = {
    inventoryId: undefined,
    amount: undefined,
    price: undefined,
  };
  const [state, setState] = useState(initialState);
  const [errors, setError] = useState({});
  const [open, setOpen] = useState(false);
  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };
  const onSave = () => {
    //error handling
    const customValidator = (state, setState) => {
      let errorObj = {};
      //console.log(state);
      //console.log(setState);
      Object.keys(state).forEach((prop) => {
        if (!state[prop]) errorObj[prop] = "This is Required";
      });
      setState(errorObj);
      return Object.keys(errorObj).length;
    };

    if (!customValidator(state, setError)) {
      addQuote(state);
      resetForm();
    }
  };

  const resetForm = () => {
    setError({});
    setOpen(false);
    setState(initialState);
  };
  return (
    <div className="new-quotes">
      {!open ? (
        <div className="quote-btn-comp">
          <BtnComp
            label="Add Quote"
            size="sm"
            icon={<Add style={{ fontSize: "1rem" }} />}
            onClick={() => setOpen(true)}
          />
        </div>
      ) : (
        <div className="new-quote-fillout">
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={5}>
              <Inventorysearcher
                label="Inventory"
                onAction={(d) => {
                  onChanged({
                    target: {
                      value: d.id,
                      name: "inventoryId",
                      type: "number",
                    },
                  });
                  //setUnit(d.unit);
                }}
                error={errors.inventoryId}
              />
            </Grid>
            <Grid item xs={3}>
              <InputComp
                onChange={onChanged}
                value={state.amount}
                label="Amount"
                name="amount"
                type="number"
                //postfix={unit}
                error={errors.amount}
                required
              />
            </Grid>
            <Grid item xs={4}>
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
          <div className="quote-btn-comp">
            <BtnComp size="sm" label="Add" onClick={onSave} />
            <BtnComp size="sm" label="Cancel" onClick={resetForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewQuotes;
