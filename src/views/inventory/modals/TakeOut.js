import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import { appContext } from "AppContext";

const TakeOut = ({ open, onClose, inv }) => {
  const { getInvList } = React.useContext(appContext);

  const [errors, setErrors] = React.useState([]);

  const [state, setState] = React.useState({
    modifiedDate: dayjs().format("YYYY-MM-DDTHH:mm"),
  });

  const findError = (type) => {
    return errors.includes(type);
  };

  const onTakeOut = () => {
    putEndpoint(`/inventory/takeout/${inv.id}`, state).then((res) => {
      if (res && res.status === 200) {
        console.log(res);
        onClose();
        getInvList(true);
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
    //.catch((errors) => setErrors(errors));
  };

  const onChange = (e) => {
    onChangeSimple(e, state, setState);
  };

  return (
    <ModalCont open={open} onClose={onClose} title={inv.name}>
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
            name="modifiedDate"
            onChange={onChange}
            value={state.modifiedDate}
          />
        </Grid>
      </Grid>
      <div className="modal-btns">
        <BtnComp label="Save" onClick={onTakeOut} />
      </div>
    </ModalCont>
  );
};

export default TakeOut;
