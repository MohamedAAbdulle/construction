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
import { appContext } from "AppContext";
import InputComp from "components/input/InputComp";
import findError from "utils/findError";

const NewInUse = ({ closeModal, passedTool }) => {
  const { getInUseTools, tools, getTools } = React.useContext(toolsContx);
  const { workers, getWorkers } = React.useContext(appContext);
  const [tool, setTool] = React.useState({
    dateAssigned: dayjs().format("YYYY-MM-DDTHH:mm"),
    toolId: passedTool?.id || null,
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
  React.useEffect(getWorkers, []);

  console.log(errors);

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
            {passedTool ? (
              <InputComp disabled={true} value={passedTool.name} label="Tool" />
            ) : (
              <ToolSearcher
                label="Tool"
                list={tools}
                error={findError("ToolId", errors)}
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
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkerSearcher
              label="Worker To Assign"
              list={workers}
              error={findError("WorkerId", errors)}
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
