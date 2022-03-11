import classNames from "classnames";
import React from "react";
import { workerContext } from "../WorkerContext";
import "./WorkersTab.sass";

const WorkersTab = () => {
  const { activeTab, setActiveTab } = React.useContext(workerContext);
  return (
    <div className="workers-tab">
      <span
        className={activeTab === 1 ? "active" : ""}
        onClick={() => setActiveTab(1)}
      >
        Active Workers
      </span>
      <span>/</span>
      <span
        className={activeTab === 2 ? "active" : ""}
        onClick={() => setActiveTab(2)}
      >
        All Workers
      </span>
    </div>
  );
};

export default WorkersTab;
