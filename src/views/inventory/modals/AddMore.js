import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { Grid } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import dayjs from "dayjs";
import { appContext } from "AppContext";

const Addmore = ({ open, onClose, inv }) => {
  const { getInvList } = React.useContext(appContext);

  const [state, setState] = React.useState({
    modifiedDate: dayjs().format("YYYY-MM-DDTHH:mm"),
  });

  const [errors, setErrors] = React.useState([]);

  const findError = (type) => {
    return errors.includes(type);
  };

  const onAddMore = () => {
    putEndpoint(`/inventory/addmore/${inv.id}`, state)
      .then(() => {
        onClose();
        getInvList(true);
      })
      .catch((a) => console.log(setErrors(a)));
  };

  const onChange = (e) => {
    onChangeSimple(e, state, setState);
  };

  const a = [
    { type: "Delivery", name: "east-afric.js", date: "12/8/2021" },
    { type: "Invoice", name: "document/dfsd.jpg", date: "12/8/2021" },
  ];

  return (
    <ModalCont
      open={open}
      onClose={onClose}
      title={
        <div>
          <h3 style={{ margin: 0 }}>{inv.name}</h3>
        </div>
      }
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
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
            name="modifiedDate"
            onChange={onChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
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
        </Grid> */}
      </Grid>
      {/* <Documents documents={a} /> */}
      <div className="modal-btns">
        <BtnComp label="Save" onClick={onAddMore} />
      </div>
    </ModalCont>
  );
};

export default Addmore;
