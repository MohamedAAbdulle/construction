import Ellipsis from "components/ellipsis/Ellipsis";
import TableCont from "components/table-comp/TableCont";
import React from "react";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint } from "services/apiFunctions";
import ToolForm from "./ToolForm";
import { toolsContx } from "../ToolsContx";
import NewInUse from "../in-use-tools/NewInUse";

const ToolsTable = () => {
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

  const data = tools.map((r) => {
    return [
      <div>{r.name}</div>,
      <div>{r.quantity}</div>,
      <div>{r.inUse}</div>,
      <div>{r.quantity - r.inUse}</div>,
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
        ]}
      ></Ellipsis>,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={["Tool Name", "Total Amount", "In Use", "In Store", ""]}
        dataList={data}
      />
      {openDeleteTool && (
        <DeleteModal
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

export default ToolsTable;
