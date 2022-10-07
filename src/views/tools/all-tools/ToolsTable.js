import Ellipsis from "components/ellipsis/Ellipsis";
import TableCont from "components/table-comp/TableCont";
import React from "react";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint, putEndpoint } from "services/apiFunctions";
import ToolForm from "./ToolForm";
import { toolsContx } from "../ToolsContx";
import NewInUse from "../in-use-tools/NewInUse";
import { dateFormatter2 } from "utils/dateFormatter";

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

  const returnAll = (tool) => {
    putEndpoint(`/tools/return-all`, tool).then(getTools);
  };

  const data = tools.map((r) => {
    return [
      <div>{r.name}</div>,
      <div>{r.quantity}</div>,
      <div>{r.inUse}</div>,
      <div>{r.quantity - r.inUse}</div>,
      <div>{dateFormatter2(r.lastModified, "DD MMM 'YY, HH:mm")}</div>,
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
      ></Ellipsis>,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={[
          "Tool Name",
          "Total Amount",
          "In Use",
          "In Store",
          "Last Modified",
          "",
        ]}
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
