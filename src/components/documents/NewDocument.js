import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import { Grid } from "@material-ui/core";
import { docType } from "utils/enums";
//import { postEndpoint } from "services/apiFunctions";
import dayjs from "dayjs";

const NewDocument = ({ onClose, addFile }) => {
  const [state, setState] = React.useState({});

  const onFileChange = (e) => {
    let fileData = e.target.files[0];
    let fileName =
      (Date.now() / 1000).toFixed() + "-" + fileData.name.replace(/ /g, "");
    setState({
      ...state,
      fileData,
      fileName,
      dateCreated: dayjs().format("YYYY-MM-DDTHH:mm"),
      status: "Created",
    });
  };

  const onSave = () => {
    addFile(state);
    onClose();
    //postEndpoint("/test", state);
  };

  return (
    <ModalCont open={true} onClose={onClose} title="New Document">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <InputComp
            type="select"
            options={docType}
            onChange={(e) =>
              setState({ ...state, [e.target.name]: e.target.value })
            }
            value={state.fileType}
            label="File Type"
            name="fileType"
            required
          />
        </Grid>
        <Grid item xs={8}>
          <InputComp
            onChange={onFileChange}
            label="File"
            name="price"
            type="file"
            required
          />
        </Grid>
      </Grid>
      <div className="modal-btns">
        <BtnComp label="Save" onClick={onSave} />
      </div>
    </ModalCont>
  );
};

export default NewDocument;
