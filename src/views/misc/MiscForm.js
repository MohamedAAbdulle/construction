import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import findError from "utils/findError";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import { postEndpoint, putEndpoint } from "services/apiFunctions";

const MiscForm = ({ closeModal, misc, getMisc }) => {
  const [state, setState] = React.useState(misc || {});
  const [errors, setErrors] = React.useState([]);

  const isNewMisc = Boolean(misc.id);

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
  };

  const onSave = () => {
    let endpoint;
    isNewMisc
      ? (endpoint = putEndpoint(`/misc/${misc.id}`, state))
      : (endpoint = postEndpoint("/misc", state));

    endpoint.then((res) => {
      if (res && res.status === 200) {
        closeModal();
        getMisc();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };

  return (
    <ModalCont
      open={true}
      onClose={closeModal}
      title={isNewMisc ? "New Misc" : "Edit Misc"}
    >
      <div className="row gy-3">
        <div className="col-12 col-lg-6">
          <InputComp
            label="Price"
            onChange={onChanged}
            value={state.price}
            name="price"
            error={findError("price", errors)}
          />
        </div>
        <div className="col-12 col-lg-6">
          <InputComp
            label="miscType"
            onChange={onChanged}
            value={state.miscType}
            name="miscType"
            error={findError("miscType", errors)}
          />
        </div>
        <div className="col-12">
          <InputComp
            label={
              <>
                Description (
                <strong className="text-primary">
                  {100 - (state.description?.length || 0)}
                </strong>
                )
              </>
            }
            type="textarea"
            name="description"
            onChange={onChanged}
            value={state.description}
          />
        </div>
      </div>

      <div className="modal-btns">
        <BtnComp label="Save" onClick={onSave} />
      </div>
    </ModalCont>
  );
};

export default MiscForm;
