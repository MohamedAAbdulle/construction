import React from "react";
import { toolsContx, ToolsContx } from "../ToolsContx";
import InUseToolsHeader from "./InUseToolsHeader";
import InUseToolsTable from "./InUseToolTable";
import { getEndpoint } from "services/apiFunctions";
import fetchStatus from "components/fetch-status/fetchStatus";

const InUseTools = () => {
  const { tools, getInUseTools, inUseTools } = React.useContext(toolsContx);
  const [workers, setWorkers] = React.useState();
  const getWorkers = () => {
    getEndpoint("/workers").then((res) => {
      let data = res.failed ? res : res.reverse();
      setWorkers(data);
    });
  };
  const setUp = () => {
    getWorkers();
    getInUseTools();
  };
  React.useEffect(setUp, []);
  return (
    <div>
      <InUseToolsHeader workers={workers} />
      {fetchStatus(
        inUseTools,
        () => (
          <InUseToolsTable workers={workers} />
        ),
        "No In Use Tools"
      )}
      {/* {tools && workers && inUseTools && <InUseToolsTable workers={workers} />} */}
    </div>
  );
};

export default InUseTools;
