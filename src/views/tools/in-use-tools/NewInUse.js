import React from "react";
import { postEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import BtnComp from "components/btn-comp/BtnComp";
import { toolsContx } from "../ToolsContx";
import WorkerSearcher from "components/searchers/WorkerSearcher";
import { appContext } from "AppContext";
import InputComp from "components/input/InputComp";
import findError from "utils/findError";

const NewInUse = ({ closeModal, passedTool }) => {
  const { workers, getWorkers } = React.useContext(appContext);
  const { getInUseTools, getTools } = React.useContext(toolsContx);
  const [state, setState] = React.useState({
    toolId: passedTool.id,
  });

  const [errors, setErrors] = React.useState({});

  const changed = (e) => {
    onChangeSimple(e, state, setState);
  };

  const assignTool = () => {
    console.log(state);
    postEndpoint(`/tools/inuse`, state).then((res) => {
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
      <ModalCont
        open={true}
        onClose={closeModal}
        title={`Assign Tool (${passedTool.name})`}
      >
        <div className="row gy-3">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
            <InputComp
              type="number"
              label="Amount To Assign"
              name="amount"
              onChange={changed}
              error={findError("Amount", errors)}
              postfix={`/${passedTool.quantity - passedTool.inUse}`}
            />
          </div>
        </div>
        <div className="modal-btns">
          <BtnComp label="Save" onClick={assignTool} />
        </div>
      </ModalCont>
    </>
  );
};

export default NewInUse;
