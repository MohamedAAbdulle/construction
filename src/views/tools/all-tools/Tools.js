import React from "react";
import { ToolsContx } from "../ToolsContx";
import ToolsHeader from "./ToolsHeader";
import ToolsTable from "./ToolsTable";

const Tools = () => {
  return (
    <div>
      <ToolsContx>
        <ToolsHeader />
        <ToolsTable />
      </ToolsContx>
    </div>
  );
};

export default Tools;
