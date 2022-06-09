import Ellipsis from "components/ellipsis/Ellipsis";
import TableCont from "components/table-comp/TableCont";
import React from "react";
import { deleteEndpoint } from "services/apiFunctions";
import dayjs from "dayjs";
import { toolsContx } from "../ToolsContx";

const InUseToolsTable = ({ workers }) => {
  const { tools, getInUseTools, inUseTools, getTools } =
    React.useContext(toolsContx);

  const returnTool = (tool) => {
    deleteEndpoint(
      `/tools/inUse?workerId=${tool.workerId}&toolId=${tool.toolId}`
    ).then(() => {
      getInUseTools();
      getTools();
    });
  };

  console.log("test");

  const data = inUseTools.map((r) => {
    console.log(r);
    let AssociatedTool = (tools || []).find((t) => t.id === r.toolId) || {};
    let AssociatedWorker =
      (workers || []).find((w) => w.id === r.workerId) || {};

    return [
      <div>{AssociatedTool.name}</div>,
      <div>{AssociatedWorker.name}</div>,
      <div>{dayjs(r.dateAssigned).format("DD MMM 'YY, HH:mm")}</div>,
      <Ellipsis
        menus={[
          {
            onClick: () => returnTool(r),
            label: "Return Tool",
          },
        ]}
      ></Ellipsis>,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={["Tool", "Worker Using", "Date Assigned", ""]}
        dataList={data}
      />
    </>
  );
};

export default InUseToolsTable;
