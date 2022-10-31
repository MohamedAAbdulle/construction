import React from "react";
import BtnComp from "components/btn-comp/BtnComp";

const UsersHeader = () => {
  /* const [open, setOpen] = React.useState(false);
  const [openCash, setOpenCash] = React.useState(false); */

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="page-title">Users</div>

        <BtnComp label="New User" onClick={() => {}} />
      </div>
      {/* {open && (
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
      )} */}
    </div>
  );
};

export default UsersHeader;
