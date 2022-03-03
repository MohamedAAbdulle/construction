import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { Grid, Button } from "@material-ui/core";
import { appContext } from "AppContext";
import moment from "moment";
import InputComp from "components/input/InputComp";
import { inventoryContext } from "../InventoryContext";

const TakeOut = ({ open, onClose, inv }) => {
  const { postEndpoint } = React.useContext(appContext);
  const { getInvList } = React.useContext(inventoryContext);

  const [errors, setErrors] = React.useState([]);

  const [state, setState] = React.useState({
    invId: inv.id,
    dateDone: moment().format("yyyy-MM-DDThh:mm"),
    type: "Removed",
  });

  const findError = (type) => {
    return errors.includes(type);
  };

  const onTakeOut = () => {
    postEndpoint(`/inventory/takeout/${inv.id}`, state, 3)
      .then((res) => {
        console.log("ruunning");
        onClose();
        getInvList();
      })
      .catch((a) => setErrors(a));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalCont
      open={open}
      onClose={onClose}
      onAction={onTakeOut}
      title={inv.name}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={5}>
          <InputComp
            type="number"
            label="Amount To Remove"
            name="quantity"
            required
            error={findError("quantity")}
            onChange={onChange}
            postfix={inv.unit}
          />
        </Grid>
        <Grid item xs={7}>
          <InputComp
            type="datetime-local"
            label="Date Created"
            name="dateDone"
            onChange={onChange}
            value={state.dateDone}
          />
        </Grid>
      </Grid>
    </ModalCont>
  );
};

export default TakeOut;
