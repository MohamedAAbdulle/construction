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
import AddNewEnum from "./AddNewEnum";

const Settings = ({ closeSlider }) => {
  const [openNewQuote, setOpenNewQuote] = React.useState(false);
  //const [errors, setErrors] = React.useState({});
  const { appEnums, getEnums } = React.useContext(appContext);
  console.log(appEnums);

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
        <div className="card-comp">
          <div className="card-title">
            Worker Types
            <IconButton onClick={() => setOpenNewQuote(true)}>
              <Add />
            </IconButton>
          </div>
          {appEnums.WorkerType&&appEnums.WorkerType.map((worker) => (
            <div className="worker-list">
              <span>{worker.keyValue}</span>
              <div>
                <InputComp onChange={() => {}} value={worker.keyName} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {openNewQuote && (
        <AddNewEnum
          onClose={() => setOpenNewQuote(false)}
          workerType={appEnums.WorkerType}
          getEnums={getEnums}
        />
      )}
    </div>
  );
};

export default Settings;
