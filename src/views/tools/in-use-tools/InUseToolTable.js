import Ellipsis from "components/ellipsis/Ellipsis";
import React from "react";
import { deleteEndpoint } from "services/apiFunctions";
import { toolsContx } from "../ToolsContx";
import { dateFormatter2 } from "utils/dateFormatter";
import DataTable from "react-data-table-component";
import inUseToolsColumns from "./inUseToolsColumns";
import inUseToolsColumnsPhone from "./inUseToolsColumnsPhone";

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

  const data = inUseTools.map((r) => {
    let AssociatedTool = (tools || []).find((t) => t.id === r.toolId) || {};
    let AssociatedWorker =
      (workers || []).find((w) => w.id === r.workerId) || {};

    return {
      toolName: AssociatedTool.name,
      workerName: AssociatedWorker.name,
      amount: r.amount,
      dateAssigned: dateFormatter2(r.dateAssigned, "DD MMM 'YY, HH:mm"),
      actions: (
        <div className="table-actions">
          <Ellipsis
            menus={[
              {
                onClick: () => returnTool(r),
                label: "Return Tool",
              },
            ]}
          ></Ellipsis>
        </div>
      ),
    };
  });

  return (
    <>
      <div className="summary-list desktop-only">
        <DataTable columns={inUseToolsColumns} data={data} />
      </div>
      <div className="summary-list phone-only">
        <DataTable columns={inUseToolsColumnsPhone} data={data} />
      </div>
    </>
  );
};

export default InUseToolsTable;
