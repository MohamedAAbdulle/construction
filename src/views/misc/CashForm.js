import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import findError from "utils/findError";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import { putEndpoint } from "services/apiFunctions";

const CashForm = ({ closeModal, getMiscs }) => {
  const [state, setState] = React.useState({});
  const [errors, setErrors] = React.useState([]);

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };

  const onSave = () => {
    putEndpoint(`/misc/cash`, state).then((res) => {
      if (res && res.status === 200) {
        closeModal();
        getMiscs();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };

  return (
    <ModalCont open={true} onClose={closeModal} title="Deposit More Money">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="mx-2">+</h2>
        <InputComp
          type="number"
          label="Amount"
          onChange={onChanged}
          name="Amount"
          error={findError("amount", errors)}
        />
      </div>

      <div className="modal-btns">
        <BtnComp label="Save" onClick={onSave} />
      </div>
    </ModalCont>
  );
};

export default CashForm;
