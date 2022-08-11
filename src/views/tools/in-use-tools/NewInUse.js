import React from "react";
import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import { postEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";
import { toolsContx } from "../ToolsContx";
import WorkerSearcher from "components/searchers/WorkerSearcher";
import ToolSearcher from "components/searchers/ToolSearcher";

const NewInUse = ({ closeModal, workers }) => {
  const { getInUseTools, tools, getTools } = React.useContext(toolsContx);
  const [tool, setTool] = React.useState({
    dateAssigned: dayjs().format("YYYY-MM-DDTHH:mm"),
  });

  const [errors, setErrors] = React.useState({});

  const changed = (e) => {
    onChangeSimple(e, tool, setTool);
  };

  const assignTool = () => {
    postEndpoint(`/tools/inuse`, tool).then((res) => {
      if (res && res.status === 200) {
        closeModal();
        getInUseTools();
        getTools();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };
  console.log(errors)

  return (
    <>
      <ModalCont open={true} onClose={closeModal} title="New Tool">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <ToolSearcher
              label="Tool"
              list={tools}
              onAction={(item) =>
                changed({
                  target: {
                    value: item.id,
                    name: "toolId",
                    type: "number",
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkerSearcher
              label="Worker To Assign"
              list={workers}
              onAction={(item) =>
                changed({
                  target: {
                    value: item.id,
                    name: "workerId",
                    type: "number",
                  },
                })
              }
            />
          </Grid>
        </Grid>

        <div className="modal-btns">
          <BtnComp label="Save" onClick={assignTool} />
        </div>
      </ModalCont>
    </>
  );
};

export default NewInUse;
