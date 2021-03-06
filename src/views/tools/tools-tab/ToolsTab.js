import React from "react";
import { toolsContx } from "../ToolsContx";

const ToolsTab = () => {
  const { activeTab, setActiveTab } = React.useContext(toolsContx);
  return (
    <div className="page-tab">
      <span
        className={activeTab === 1 ? "active" : ""}
        onClick={() => setActiveTab(1)}
      >
        All Tools
      </span>
      <span>/</span>
      <span
        className={activeTab === 2 ? "active" : ""}
        onClick={() => setActiveTab(2)}
      >
        In Use
      </span>
    </div>
  );
};

export default ToolsTab;
