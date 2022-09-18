import { CircularProgress } from "@material-ui/core";
import FailedToFetch from "components/fetch-status/FailedToFetch";
import React from "react";

const fetchStatus = (response, successComponent, emptyMessage) => {
  //console.log(response);
  if (response) {
    if (response.failed) return <FailedToFetch />;
    else if (response.length === 0)
      return (
        <p
          style={{
            color: "#afa6a6",
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "lighter",
          }}
        >
          {emptyMessage}
        </p>
      );
    else return successComponent();
  } else return <CircularProgress className=""/>;
};

export default fetchStatus;
