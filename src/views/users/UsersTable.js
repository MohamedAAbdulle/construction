import React from "react";
import dateFormatter from "utils/dateFormatter";
import Ellipsis from "components/ellipsis/Ellipsis";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
/* import { deleteEndpoint } from "services/apiFunctions";
import { digitsToCurrency } from "utils/currencyFormatter";
import MiscForm from "./MiscForm";
import DeleteModal from "components/delete-modal/DeleteModal"; */
import userTableData from "./usersTableData";
import DataTable from "react-data-table-component";

const UsersTable = ({ usersList, getMiscs }) => {
  /* const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const deleteMisc = (id) => {
    deleteEndpoint(`/misc/${id}`).then(() => {
      getMiscs();
      setOpenDelete(false);
    });
  }; */

  let _data = usersList?.map((data) => {
    return {
      email: (
        <Tooltip title={data.email}>
          <div>{data.email}</div>
        </Tooltip>
      ),
      name: data.name,
      type: data.type,
      dateCreated: dateFormatter(data.dateCreated, "MMM DD, YYYY"),
      actions: (
        <div className="table-actions">
          <Ellipsis
            menus={[
              {
                onClick: () => {},
                label: "Edit",
              },
              {
                onClick: () => {},
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
    </>
  );
};
export default UsersTable;
