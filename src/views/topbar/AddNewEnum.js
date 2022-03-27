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

const AddNewEnum = ({ onClose, workerType, getEnums }) => {
  const [newValue, setNewValue] = React.useState("");
  const CreateNewWorkType = () => {
    if (newValue) {
      postEndpoint(`/settings/enums`, {
        enumType: "WorkerType",
        keyValue: workerType ? workerType.length + 1 : 1,
        keyName: newValue,
      }).then((res) => {
        if (res && res.status === 200) {
          onClose();
          getEnums();
        } else if (res && res.errors) {
          //setErrors(res.errors);
        }
      });
    }
  };
  return (
    <ModalCont open={true} onClose={onClose} title="Worker Type">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <InputComp
            onChange={(e) => setNewValue(e.target.value)}
            name="price"
            placeholder="New Worker Type"
            required
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
