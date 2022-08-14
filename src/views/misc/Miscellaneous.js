import fetchStatus from "components/fetch-status/fetchStatus";
import React, { useEffect } from "react";
import { getEndpoint } from "services/apiFunctions";
import MiscHeader from "./MiscHeader";
import MiscTable from "./MiscTable";
import { miscList as _miscList } from "./miscTableData";

const Miscellaneous = () => {
  const [miscList, setMiscList] = React.useState();

  const getMiscs = () => {
    getEndpoint("/miscs").then((res) => {
      //let data = res.failed ? res : res.reverse();
      //setMiscList(data);
      setMiscList(_miscList);
    });
  };
  useEffect(getMiscs, []);
  return (
    <div>
      <MiscHeader getMiscs={getMiscs} />
      {fetchStatus(
        miscList,
        () => (
          <MiscTable miscList={miscList} getMiscs={getMiscs} />
        ),
        "No Miscellaneous"
      )}
    </div>
  );
};

export default Miscellaneous;
