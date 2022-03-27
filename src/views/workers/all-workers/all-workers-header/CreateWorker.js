import { Grid } from "@material-ui/core";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import { workerContext } from "views/workers/WorkerContext";
import { appContext } from "AppContext";

const Createworker = ({ open, setOpen, state }) => {
  const { getAllWorkers } = React.useContext(workerContext);
  const { appEnums } = React.useContext(appContext);

  const [errors, setErrors] = React.useState({});
  const [worker, setWorker] = React.useState(state || {});

  const changed = (e) => {
    onChangeSimple(e, worker, setWorker);
  };

  const findError = (type) => {
    if (errors[type]) {
      return errors[type][0];
    }
  };

  const closeAction = () => setOpen(false);

  const saveWorker = () => {
    state
      ? putEndpoint(`/workers/${worker.id}`, worker).then((res) => {
          if (res && res.status === 200) {
            setOpen(false);
            getAllWorkers();
          } else if (res && res.errors) {
            setErrors(res.errors);
          }
        })
      : postEndpoint(`/workers`, worker).then((res) => {
          console.log(res);
          if (res && res.status === 200) {
            setOpen(false);
            getAllWorkers();
          } else if (res && res.errors) {
            setErrors(res.errors);
          }
        });
  };

  return (
    <ModalCont open={open} onClose={closeAction} title="New Worker">
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={changed}
            value={worker.name || ""}
            name="name"
            label="Item Name"
            required
            error={findError("Name")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputComp
            onChange={changed}
            value={worker.rate || ""}
            error={findError("Rate")}
            name="rate"
            type="number"
            required
            label="Rate"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={changed}
            value={worker.workerType || ""}
            error={findError("WorkerType")}
            name="workerType"
            type="select"
            options={appEnums.WorkerType}
            required
            label="WorkerType"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputComp
            onChange={changed}
            value={worker.idNumber || ""}
            error={findError("IdNumber")}
            name="idNumber"
            type="number"
            required
            label="IdNumber"
          />
        </Grid>
      </Grid>
      <div className="modal-btns">
        <BtnComp label="Save" onClick={saveWorker} />
      </div>
    </ModalCont>
  );
};

export default Createworker;
