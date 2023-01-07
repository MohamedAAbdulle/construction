import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import { toolsContx } from "../ToolsContx";
import AllToolsTable from "./all-tools-table/AllToolsTable";
import AllToolsHeader from "./ToolsHeader";

const AllTools = () => {
  const { tools } = React.useContext(toolsContx);
  return (
    <div className="all-tools">
      <AllToolsHeader />
      {fetchStatus(
        tools,
        () => (
          <AllToolsTable />
        ),
        "No Tools"
      )}
    </div>
  );
};

export default AllTools;
