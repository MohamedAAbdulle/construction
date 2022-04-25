import React from "react";
import AllTools from "./all-tools/AllTools";
import InUseTools from "./in-use-tools/InUseTools";
import { toolsContx, ToolsContx } from "./ToolsContx";

const Tools = () => {
  return (
    <ToolsContx>
      <ToolsContent />
    </ToolsContx>
  );
};
const ToolsContent = () => {
  const { tools } = React.useContext(toolsContx);

  const { activeTab } = React.useContext(toolsContx);
  return <>{tools && <>{activeTab === 1 ? <AllTools /> : <InUseTools />}</>}</>;
};

export default Tools;
