import React, { useState } from "react";
import dateFormatter from "utils/dateFormatter";
import Ellipsis from "components/ellipsis/Ellipsis";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import userTableData from "./usersTableData";
import DataTable from "react-data-table-component";
import joinStrings from "utils/joinStrings";
import assignColor from "utils/assignColors";
import { deleteEndpoint, postEndpoint } from "services/apiFunctions";
import ConfirmationModal from "components/delete-modal/ConfirmationModal";
import getUserPoolId from "utils/getUserPoolId";
import EditUserForm from "./EditUserForm";

const UsersTable = ({ usersList, getUsers }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const disableUser = (data) => {
    postEndpoint(`/users/disable`, {
      username: data.email,
      userPoolId: getUserPoolId(),
    }).then((res) => {
      if (res.success) {
        getUsers();
      }
    });
  };
  const enableUser = (data) => {
    postEndpoint(`/users/enable`, {
      username: data.email,
      userPoolId: getUserPoolId(),
    }).then((res) => {
      if (res.success) {
        getUsers();
      }
    });
  };
  const deleteUser = (data) => {
    const query = { username: data.email, userPoolId: getUserPoolId() };
    const queryStr = new URLSearchParams(query).toString();
    deleteEndpoint(`/users?${queryStr}`).then((res) => {
      if (res.success) {
        getUsers();
        setOpenDelete(false);
      }
    });
  };

  let colorList = ["green", "red", "orange"];
  let _data = usersList?.map((data) => {
    const fullName = joinStrings(
      [data.given_name, data.middle_name, data.family_name],
      " "
    );
    return {
      email: (
        <Tooltip title={data.email}>
          <div>{data.email}</div>
        </Tooltip>
      ),
      name: fullName,
      type: (
        <div
          className={assignColor(
            ["Active", "Inactive", "Pending"],
            colorList,
            data.status
          )}
        >
          {data.status}
        </div>
      ),
      userCreateDate: dateFormatter(data.userCreateDate, "MMM DD, YYYY"),
      actions: (
        <div className="table-actions">
          <Ellipsis
            menus={[
              {
                onClick: () => {
                  setOpenEdit(data);
                },
                label: "Edit",
              },

              data.status === "Inactive"
                ? {
                    onClick: () => enableUser(data),
                    label: "Enable",
                  }
                : {
                    onClick: () => disableUser(data),
                    label: "Disable",
                  },

              {
                onClick: () => {
                  setOpenDelete({ ...data, fullName });
                },
                label: "Delete",
              },
            ]}
          ></Ellipsis>
        </div>
      ),
    };
  });
  return (
    <>
      <div className="summary-list">
        <DataTable
          columns={userTableData}
          data={_data}
          // sortFunction={sortFunction}
        />
        {/* <CustomPagination setRequest={setRequest} request={request} /> */}
      </div>
      {openDelete && (
        <ConfirmationModal
          onClose={() => setOpenDelete(false)}
          deleteAction={() => deleteUser(openDelete)}
          message={
            <p>
              Are you sure you want to delete <br />
              <i>{openDelete.fullName}</i>
            </p>
          }
          title={`Delete User`}
        />
      )}
      {openEdit && (
        <EditUserForm
          closeModal={() => setOpenEdit(false)}
          getUsers={getUsers}
          state={openEdit}
        />
      )}
    </>
  );
};
export default UsersTable;
