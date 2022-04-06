import { IconButton } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import InputComp from "components/input/InputComp";
import React from "react";
import onChangeSimple from "utils/onChangeSimple";

const WorkerTypeItem = ({ worker, updateWorkerType }) => {
  const [state, setState] = React.useState(worker);
  const changed = (e) => {
    onChangeSimple(e, state, setState);
  };
  return (
    <div className="worker-type">
      <span>{worker.typeValue}</span>
      <div>
        <InputComp name="typeName" onChange={changed} value={state.typeName} />
      </div>
      <div className="worker-type-rate">
        <InputComp
          type="number"
          name="rate"
          onChange={changed}
          value={state.rate}
        />
      </div>
      <IconButton onClick={() => updateWorkerType(state)}>
        <Save />
      </IconButton>
    </div>
  );
};

export default WorkerTypeItem;
