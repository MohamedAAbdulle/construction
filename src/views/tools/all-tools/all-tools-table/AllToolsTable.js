import Ellipsis from "components/ellipsis/Ellipsis";
import React from "react";
import ConfirmationModal from "components/delete-modal/ConfirmationModal";
import { deleteEndpoint, putEndpoint } from "services/apiFunctions";
import ToolForm from "../ToolForm";
import { dateFormatter2 } from "utils/dateFormatter";
import { toolsContx } from "views/tools/ToolsContx";
import NewInUse from "views/tools/in-use-tools/NewInUse";
import DataTable from "react-data-table-component";
import allToolsColumns from "./allToolsColumns";
import allToolsColumnsPhone from "./allToolsColumnsPhone";

const AllToolsTable = () => {
  const { tools, getTools } = React.useContext(toolsContx);
  const [openAssign, setOpenAssign] = React.useState(false);

  const [openDeleteTool, setOpenDeleteTool] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const deleteTool = (id) => {
    deleteEndpoint(`/tools/${id}`).then(() => {
      getTools();
      setOpenDeleteTool(false);
    });
  };

  const returnAll = (tool) => {
    putEndpoint(`/tools/return-all`, tool).then(getTools);
  };

  const data = tools.map((r) => ({
    name: r.name,
    quantity: r.quantity,
    inUse: r.inUse,
    inStore: r.quantity - r.inUse,
    lastModified: dateFormatter2(r.lastModified, "DD MMM 'YY, HH:mm"),
    actions: (
      <div className="table-actions">
        <Ellipsis
          menus={[
            {
              onClick: () => setOpenEdit(r),
              label: "Edit",
            },
            {
              onClick: () => {
                setOpenDeleteTool(r.id);
              },
              label: "Delete",
            },
            {
              onClick: () => {
                setOpenAssign(r);
              },
              label: "Assign",
            },
            {
              onClick: () => {
                returnAll(r);
              },
              label: "Return All",
            },
          ]}
        ></Ellipsis>
      </div>
    ),
  }));

  return (
    <>
      <div className="summary-list desktop-only">
        <DataTable columns={allToolsColumns} data={data} />
      </div>
      <div className="summary-list phone-only">
        <DataTable columns={allToolsColumnsPhone} data={data} />
      </div>

      {openDeleteTool && (
        <ConfirmationModal
          onClose={() => setOpenDeleteTool(false)}
          deleteAction={() => deleteTool(openDeleteTool)}
          message={`This Tool will be permanently deleted!`}
          title="Delete Tool"
        />
      )}
      {openEdit && (
        <ToolForm closeModal={() => setOpenEdit(false)} state={openEdit} />
      )}
      {openAssign.id && (
        <NewInUse
          closeModal={() => setOpenAssign(false)}
          passedTool={openAssign}
        />
      )}
    </>
  );
};

export default AllToolsTable;
