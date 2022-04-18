import React from "react";
import { getEndpoint } from "services/apiFunctions";

const toolsContx = React.createContext();

const ToolsContx = (props) => {
  const [tools, setTools] = React.useState([]);
  const [inUseTools, setInUseTools] = React.useState([]);

  const getTools = () => {
    getEndpoint("/tools").then((res) => {
      let a = res.reverse();
      setTools(a);
    });
  };

  const getInUseTools = () => {
    getEndpoint(`/tools/inUse`).then((res) => {
      setInUseTools(res.reverse());
    });
  };

  React.useEffect(getTools, []);

  return (
    <toolsContx.Provider value={{ tools, getTools, getInUseTools, inUseTools }}>
      {props.children}
    </toolsContx.Provider>
  );
};

export { ToolsContx, toolsContx };
