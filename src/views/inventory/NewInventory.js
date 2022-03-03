import React from "react";
import {
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { appContext } from "AppContext";
import { inventoryContext } from "./InventoryContext";

const NewInventory = ({ open, setOpen }) => {
  const { postEndpoint } = React.useContext(appContext);
  const { getInvList } = React.useContext(inventoryContext);

  const [newInv, setNewInv] = React.useState({
    id: 10,
    name: "Mohamed",
    unit: "Bags",
    quantity: 136,
    status: 0,
    threshold: 100,
    dateModified: "2022-03-02T15:20",
  });
  const [errors, setErrors] = React.useState([]);

  const changed = (e) => {
    const { name, value } = e.target;
    setNewInv((prev) => ({ ...prev, [name]: value }));
  };

  const addInventory = () => {
    postEndpoint(`/inventory`, newInv)
      .then((res) => {
        setOpen(false);
        getInvList();
      })
      .catch((err) => setErrors(err));
  };
  const findError = (type) => {
    return errors.includes(type);
  };
  return (
    <Modal open={open}>
      <div className="modal-content">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5">New Inventory</Typography>
          </Grid>
          <Grid item>
            <IconButton color="inherit" onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              size="small"
              onChange={changed}
              value={newInv.name || ""}
              name="name"
              error={findError("name")}
              label="Item Name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              size="small"
              onChange={changed}
              value={newInv.unit}
              error={findError("unit")}
              name="unit"
              label="Unit"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              size="small"
              onChange={changed}
              value={newInv.quantity || ""}
              name="quantity"
              error={findError("quantity")}
              label="Quantity"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              size="small"
              onChange={changed}
              value={newInv.threshold || ""}
              error={findError("threshold")}
              name="threshold"
              label="Threshold"
              type="number"
            />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => addInventory(newInv)}
          >
            Save
          </Button>
        </Grid>
      </div>
    </Modal>
  );
};

export default NewInventory;
