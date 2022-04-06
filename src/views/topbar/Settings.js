import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { Add, Close, Save } from "@material-ui/icons";
import ModalCont from "components/modalCont/ModalCont";
import { appContext } from "AppContext";
import "./settings.sass";
import AddNewEnum from "./AddNewEnum";
import WorkerTypeItem from "./WorkerTypeItem";

const Settings = ({ closeSlider }) => {
  const [openNewQuote, setOpenNewQuote] = React.useState(false);
  //const [errors, setErrors] = React.useState({});
  const { getWorkerTypes, WorkerTypes } = React.useContext(appContext);

  const updateWorkerType = (worker) => {
    putEndpoint(`/Workers/WorkerTypes`, worker).then(() => getWorkerTypes());
  };
  return (
    <div className="settings">
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="center">
          <Grid item>Settings</Grid>
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <BtnComp label="Save" onClick={onSave} /> */}
              <IconButton onClick={closeSlider}>
                <Close />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="slider-body">
        <div className="card-comp worker-types">
          <div className="card-title">
            Worker Types
            <IconButton onClick={() => setOpenNewQuote(true)}>
              <Add />
            </IconButton>
          </div>
          {WorkerTypes &&
            WorkerTypes.map((worker, index) => (
              <WorkerTypeItem
                worker={worker}
                key={index}
                updateWorkerType={updateWorkerType}
              />
            ))}
        </div>
      </div>
      {openNewQuote && (
        <AddNewEnum
          onClose={() => setOpenNewQuote(false)}
          getWorkerTypes={getWorkerTypes}
        />
      )}
    </div>
  );
};

export default Settings;
