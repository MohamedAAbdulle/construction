import React from "react";
import BtnComp from "components/btn-comp/BtnComp";
import MiscForm from "./MiscForm";
import Ellipsis from "components/ellipsis/Ellipsis";
import CashForm from "./CashForm";
//import ToolForm from "./ToolForm";
//import ToolsTab from "../tools-tab/ToolsTab";

const MiscHeader = ({ totalMisc, getMiscs }) => {
  const [open, setOpen] = React.useState(false);
  const [openCash, setOpenCash] = React.useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="page-title">Miscellaneous</div>
        <div className="mx-2">
          <h4 className="m-0 d-flex align-items-center">
            <span className="fw-normal mx-1">Cash:</span>
            <span> {totalMisc}</span>
            <Ellipsis
              menus={[
                {
                  onClick: () => {
                    setOpenCash(true);
                  },
                  label: "Deposit More",
                },
                {
                  onClick: () => {},
                  label: "Details",
                },
              ]}
            />
          </h4>
        </div>
        <BtnComp label="New Misc" onClick={() => setOpen(true)} />
      </div>
      {open && (
        <MiscForm
          getMiscs={getMiscs}
          closeModal={() => setOpen(false)}
          misc={{}}
        />
      )}
      {openCash && (
        <CashForm
          getMiscs={getMiscs}
          closeModal={() => setOpenCash(false)}
          misc={{}}
        />
      )}
    </div>
  );
};

export default MiscHeader;
