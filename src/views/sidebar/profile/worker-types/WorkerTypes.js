import { appContext } from "AppContext";
import React from "react";
import WorkerTypeForm from "./WorkerTypeForm";
import "./worker-types.sass";
import { Add, Edit } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import InputComp from "components/input/InputComp";

const WorkerTypes = () => {
  const { getWorkerTypes, WorkerTypes } = React.useContext(appContext);
  const [openForm, setOpenForm] = React.useState(false);

  return (
    <>
      <div className="card-comp worker-types">
        <div className="card-title">
          Worker Types
          <IconButton onClick={() => setOpenForm({})}>
            <Add />
          </IconButton>
        </div>

        {WorkerTypes &&
          WorkerTypes.map((worker, index) => (
            <div className="worker-type" key={index}>
              <span>{worker.typeValue}</span>
              <div>
                <InputComp
                  name="typeName"
                  value={worker.typeName}
                  disabled
                  label="Worker Type"
                />
              </div>
              <div className="worker-type-rate">
                <InputComp
                  type="number"
                  name="rate"
                  value={worker.rate}
                  disabled
                  label="Pay Rate"
                />
              </div>
              <IconButton onClick={() => setOpenForm(worker)}>
                <Edit />
              </IconButton>
            </div>
          ))}
      </div>
      {openForm && (
        <WorkerTypeForm
          onClose={() => setOpenForm(false)}
          getWorkerTypes={getWorkerTypes}
          worker={openForm}
        />
      )}
    </>
  );
};

export default WorkerTypes;
