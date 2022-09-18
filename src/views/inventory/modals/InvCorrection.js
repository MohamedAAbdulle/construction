import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import dayjs from "dayjs";
import { appContext } from "AppContext";
import findError from "utils/findError";
import { invCorrectionType } from "utils/enums";

const InvCorrection = ({ open, onClose, inv }) => {
  const { getInvList } = React.useContext(appContext);

  const [state, setState] = React.useState({
    type: "CorrectionAdd",
    modifiedDate: dayjs().format("YYYY-MM-DDTHH:mm"),
  });


  const onAddMore = () => {
    putEndpoint(`/inventory/quantity/${inv.id}`, state)
      .then(() => {
        onClose();
        getInvList(true);
      })
      //.catch((a) => console.log(setErrors(a)));
  };

  const onChange = (e) => {
    onChangeSimple(e, state, setState);
  };

  return (
    <ModalCont
      open={open}
      onClose={onClose}
      title={`Correction (${inv.name})`}
    >
      <div className="row gy-3">
        <div className="col-12 col-lg-6">
          <InputComp
            type="select"
            label="Correction Type"
            name="type"
            error={findError("Type")}
            onChange={onChange}
            options={invCorrectionType}
            value={state.type}
          />
        </div>
        <div className="col-12 col-lg-6">
          <InputComp
            type="datetime-local"
            label="Date Created"
            name="modifiedDate"
            onChange={onChange}
            value={state.modifiedDate}
          />
        </div>
        <div className="d-flex align-items-center">
          <h3 className="fw-normal">{inv.quantity}</h3>
          <h2 className="my-0 mx-2">
            {state.type === "CorrectionAdd" ? "+" : "-"}
          </h2>

          <InputComp
            type="number"
            label="Amount"
            name="quantity"
            error={findError("Quantity")}
            onChange={onChange}
            postfix={inv.unit}
          />
        </div>
      </div>

      {/* <Documents documents={a} /> */}
      <div className="modal-btns">
        <BtnComp label="Save" onClick={onAddMore} />
      </div>
    </ModalCont>
  );
};

export default InvCorrection;
