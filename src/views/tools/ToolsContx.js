import React from "react";
import { getEndpoint } from "services/apiFunctions";

const toolsContx = React.createContext();

const ToolsContx = (props) => {
  const [activeTab, setActiveTab] = React.useState(1);
  const [tools, setTools] = React.useState();
  const [inUseTools, setInUseTools] = React.useState();

  const getTools = () => {
    getEndpoint("/tools").then((res) => {
      let data = res.failed ? res : res.reverse();
      setTools(data);
    });
  };

  const getInUseTools = () => {
    getEndpoint(`/tools/inUse`).then((res) => {
      let data = res.failed ? res : res.reverse();
      setInUseTools(data);
    });
  };

  React.useEffect(getTools, []);

  return (
    <toolsContx.Provider
      value={{
        tools,
        getTools,
        getInUseTools,
        inUseTools,
        activeTab,
        setActiveTab,
      }}
    >
      {props.children}
    </toolsContx.Provider>
  );
};

export { ToolsContx, toolsContx };
