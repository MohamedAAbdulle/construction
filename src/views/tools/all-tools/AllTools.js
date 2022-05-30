import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import { toolsContx } from "../ToolsContx";
import AllToolsHeader from "./ToolsHeader";
import ToolsTable from "./ToolsTable";

const AllTools = () => {
  const { tools } = React.useContext(toolsContx);
  return (
    <div>
      <AllToolsHeader />
      {fetchStatus(tools, ()=><ToolsTable />, "No Tools")}
    </div>
  );
};

export default AllTools;
