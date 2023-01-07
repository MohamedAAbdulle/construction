import React from "react";
import AllTools from "./all-tools/AllTools";
import InUseTools from "./in-use-tools/InUseTools";
import { toolsContx, ToolsContx } from "./ToolsContx";
import "./tools.sass";

const Tools = () => {
  return (
    <ToolsContx>
      <ToolsContent />
    </ToolsContx>
  );
};
const ToolsContent = () => {
  const { activeTab } = React.useContext(toolsContx);
  return activeTab === 1 ? <AllTools /> : <InUseTools />;
};

export default Tools;
