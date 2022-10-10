import fetchStatus from "components/fetch-status/fetchStatus";
import React, { useEffect } from "react";
import { getEndpoint } from "services/apiFunctions";
import MiscHeader from "./MiscHeader";
import MiscTable from "./MiscTable";

const Miscellaneous = () => {
  const [miscList, setMiscList] = React.useState();
  const [totalMisc, setTotalMisc] = React.useState();

  const getMiscs = () => {
    getEndpoint("/misc").then((res) => {
      let data = res.failed ? res : res.reverse();
      setMiscList(data);
      //setMiscList(_miscList);
    });
    getEndpoint("/misc/cash").then((res) => {
      if (res.failed) {
        setTotalMisc(<i className="negative-action"> failed</i>);
      } else {
        setTotalMisc(res.amount);
      }
    });
  };
  useEffect(getMiscs, []);
  return (
    <div>
      <MiscHeader getMiscs={getMiscs} totalMisc={totalMisc} />
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
