import React, { useState } from "react";
import BtnComp from "components/btn-comp/BtnComp";

import NewUserForm from "./NewUserForm";

const UsersHeader = ({ getUsers }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="page-title">Users</div>

        <BtnComp label="New User" onClick={() => setOpen(true)} />
      </div>

      {open && (
        <NewUserForm closeModal={() => setOpen(false)} getUsers={getUsers} />
      )}
    </div>
  );
};

export default UsersHeader;
