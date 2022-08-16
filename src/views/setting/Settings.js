import React from "react";
import WorkerTypes from "./worker-types/WorkerTypes";

const Settings = () => {
  return (
    <div className="settings">
      <div className="my-2">
        <div className="page-title">Settings</div>
      </div>
      <div className="">
        <WorkerTypes />
      </div>
    </div>
  );
};

export default Settings;
