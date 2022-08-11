import React from "react";
import { Grid } from "@material-ui/core";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import ModalCont from "components/modalCont/ModalCont";
import "./worker-types.sass";

const WorkerTypeForm = ({ onClose, getWorkerTypes, worker }) => {
  const [newValue, setNewValue] = React.useState(worker);
  const CreateNewWorkType = () => {
    if (newValue.typeName) {
      let l;
      if (newValue.typeValue) l = putEndpoint(`/Workers/WorkerTypes`, newValue);
      else l = postEndpoint(`/Workers/WorkerTypes`, newValue);

      l.then((res) => {
        if (res && res.status === 200) {
          onClose();
          getWorkerTypes();
        } else if (res && res.errors) {
          //setErrors(res.errors);
        }
      });
    }
  };

  const changed = (e) => {
    onChangeSimple(e, newValue, setNewValue);
  };
  return (
    <ModalCont open={true} onClose={onClose} title="Worker Type">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item sm={6}>
          <InputComp
            value={newValue.typeName}
            onChange={changed}
            name="typeName"
            placeholder="New Worker Type"
            required
          />
        </Grid>
        <Grid item sm={6}>
          <InputComp
            value={newValue.rate}
            onChange={changed}
            name="rate"
            placeholder="Rate"
            required
            type="number"
          />
        </Grid>
      </Grid>
      <div className="modal-btns">
        <BtnComp label="Save" onClick={CreateNewWorkType} />
      </div>
    </ModalCont>
  );
};

export default WorkerTypeForm;
