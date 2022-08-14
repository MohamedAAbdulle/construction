import React from "react";
import BtnComp from "components/btn-comp/BtnComp";
import MiscForm from "./MiscForm";
//import ToolForm from "./ToolForm";
//import ToolsTab from "../tools-tab/ToolsTab";

const MiscHeader = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Miscellaneous</h4>
        <div className="mx-2">
          <h4 className="m-0">
            <span className="fw-normal">Pocket Money:</span> <span>400</span>
          </h4>
        </div>
        <BtnComp label="Create Misc" onClick={() => setOpen(true)} />
      </div>
      {open && <MiscForm closeModal={() => setOpen(false)} misc={{}} />}
    </div>
  );
};

export default MiscHeader;
