import React from "react";
import { toolsContx, ToolsContx } from "../ToolsContx";
import InUseToolsHeader from "./InUseToolsHeader";
import InUseToolsTable from "./InUseToolTable";
import { getEndpoint } from "services/apiFunctions";

const InUseTools = () => {
  return (
    <ToolsContx>
      <InUseToolsBody />
    </ToolsContx>
  );
};
const InUseToolsBody = () => {
  const { tools, getInUseTools, inUseTools } = React.useContext(toolsContx);
  const [workers, setWorkers] = React.useState();
  const getWorkers = () => {
    getEndpoint("/workers").then((res) => {
      setWorkers(res.reverse());
    });
  };
  const setUp = () => {
    getWorkers();
    getInUseTools();
  };
  React.useEffect(setUp, []);
  return (
    <div>
      {tools && workers && inUseTools && (
        <>
          <InUseToolsHeader workers={workers} />
          <InUseToolsTable workers={workers} />
        </>
      )}
    </div>
  );
};

export default InUseTools;
