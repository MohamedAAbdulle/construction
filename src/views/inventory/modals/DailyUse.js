import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import { appContext } from "AppContext";
import findError from "utils/findError";

const DailyUse = ({ open, onClose, inv }) => {
  const { getInvList } = React.useContext(appContext);

  const [errors, setErrors] = React.useState({});

  const [state, setState] = React.useState({
    type: "DailyUsage",
    modifiedDate: dayjs().format("YYYY-MM-DDTHH:mm"),
  });

  const onTakeOut = () => {
    putEndpoint(`/inventory/quantity/${inv.id}`, state).then((res) => {
      if (res && res.status === 200) {
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
    <ModalCont open={open} onClose={onClose} title={`Daily Use (${inv.name})`}>
      <div className="row gy-3">
        <div className="col-lg-6">
          <div className="d-flex align-items-center">
            <h3 className="fw-normal m-0">{inv.quantity}</h3>
            <h2 className="my-0 mx-2">-</h2>
            <InputComp
              type="number"
              label="Amount To Remove"
              name="quantity"
              required
              error={findError("Quantity", errors)}
              onChange={onChange}
              postfix={inv.unit}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <InputComp
            type="datetime-local"
            label="Date Created"
            name="modifiedDate"
            onChange={onChange}
            value={state.modifiedDate}
            error={findError("ModifiedDate", errors)}
          />
        </div>
      </div>

      <div className="modal-btns">
        <BtnComp label="Save" onClick={onTakeOut} />
      </div>
    </ModalCont>
  );
};

export default DailyUse;
