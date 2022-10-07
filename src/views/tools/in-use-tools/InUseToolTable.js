import Ellipsis from "components/ellipsis/Ellipsis";
import TableCont from "components/table-comp/TableCont";
import React from "react";
import { deleteEndpoint } from "services/apiFunctions";
import { toolsContx } from "../ToolsContx";
import { dateFormatter2 } from "utils/dateFormatter";

const InUseToolsTable = ({ workers }) => {
  const { tools, getInUseTools, inUseTools, getTools } =
    React.useContext(toolsContx);

  const returnTool = (tool) => {
    deleteEndpoint(
      `/tools/inUse?workerId=${tool.workerId}&toolId=${tool.toolId}&dateAssigned=${tool.dateAssigned}`
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
      <div>{r.amount}</div>,
      <div>{dateFormatter2(r.dateAssigned,"DD MMM 'YY, HH:mm")}</div>,
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
        tableTitles={[
          "Tool",
          "Worker Assigned To",
          "Amount",
          "Date Assigned",
          "",
        ]}
        dataList={data}
      />
    </>
  );
};

export default InUseToolsTable;
