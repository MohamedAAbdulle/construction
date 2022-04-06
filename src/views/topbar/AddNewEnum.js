import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { Add, Close } from "@material-ui/icons";
import ModalCont from "components/modalCont/ModalCont";
import { appContext } from "AppContext";
import "./settings.sass";

const AddNewEnum = ({ onClose, getWorkerTypes }) => {
  const [newValue, setNewValue] = React.useState({});
  const CreateNewWorkType = () => {
    if (newValue.typeName) {
      postEndpoint(`/Workers/WorkerTypes`, {
        rate: newValue.rate,
        typeName: newValue.typeName,
      }).then((res) => {
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
            onChange={changed}
            name="typeName"
            placeholder="New Worker Type"
            required
          />
        </Grid>
        <Grid item sm={6}>
          <InputComp
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

export default AddNewEnum;
