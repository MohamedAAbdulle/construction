import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { Grid, Button } from "@material-ui/core";
import { docType, accountType } from "utils/enums";
import { appContext } from "AppContext";
import InputComp from "components/input/InputComp";
import { inventoryContext } from "../InventoryContext";
import Documents from "components/documents/Documents";

const Addmore = ({ open, onClose, inv }) => {
  const { postEndpoint } = React.useContext(appContext);
  const { getInvList } = React.useContext(inventoryContext);

  const [state, setState] = React.useState({
    invId: inv.id,
    invName: inv.name,
    unit: inv.unit,
    type: "Added",
  });

  const [errors, setErrors] = React.useState([]);

  const findError = (type) => {
    return errors.includes(type);
  };

  const onAddMore = () => {
    postEndpoint(`/inventory/addmore/${inv.id}`, { ...state, invId: inv.id }, 3)
      .then(() => {
        onClose();
        getInvList();
      })
      .catch((a) => setErrors(a));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const a = [
    { type: "Delivery", name: "east-afric.js", date: "12/8/2021" },
    { type: "Invoice", name: "document/dfsd.jpg", date: "12/8/2021" },
  ];

  return (
    <ModalCont
      open={open}
      onClose={onClose}
      onAction={onAddMore}
      title={
        <div>
          <h3 style={{ margin: 0 }}>{inv.name}</h3>
        </div>
      }
    >
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <InputComp
            type="number"
            label="Amount To Add"
            name="quantity"
            error={findError("quantity")}
            onChange={onChange}
            postfix={inv.unit}
          />
        </Grid>
        <Grid item xs={6}>
          <InputComp
            type="datetime-local"
            label="Date Created"
            name="dateDone"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputComp
            name="supplierName"
            error={findError("supplierName")}
            onChange={onChange}
            label="Supply Name"
          />
        </Grid>
        <Grid item xs={6}>
          <InputComp
            type="number"
            label="Price"
            name="price"
            error={findError("price")}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputComp
            type="select"
            select
            label="Status"
            name="status"
            error={findError("status")}
            onChange={onChange}
            options={accountType}
          />
        </Grid>
      </Grid>
      <Documents documents={a} />
    </ModalCont>
  );
};

export default Addmore;
