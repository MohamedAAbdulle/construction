import React from "react";
import BtnComp from "components/btn-comp/BtnComp";
import StickySlider from "components/sliderModal/StickySlider";
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
      <StickySlider clickState={open} setClickState={setOpen}>
        <MiscForm closeSlider={() => setOpen(false)} misc={{}} />
      </StickySlider>
    </div>
  );
};

export default MiscHeader;
