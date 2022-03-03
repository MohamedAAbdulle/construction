import React from "react";
import { dateReadable } from "utils/dateFormatter";
import ModalCont from "components/modalCont/ModalCont";
import { Grid } from "@material-ui/core";
import { appContext } from "AppContext";

const InvHistory = ({ open, onClose, inv }) => {
  const { getEndpoint } = React.useContext(appContext);
  const [state, setState] = React.useState([]);

  const getInvHistory = () => {
    console.log("test");
    getEndpoint(`/invhistory/${inv.id}`, 2).then((res) => setState(res));
  };

  React.useEffect(getInvHistory, []);

  return (
    <ModalCont
      open={open}
      onClose={onClose}
      title={
        <div>
          <h3 style={{ margin: 0 }}>{inv.name}</h3>
        </div>
      }
    >
      {state.length ? (
        <>
          {state.map((item, index) => (
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              key={index}
            >
              <Grid
                item
                xs={3}
                style={{ color: item.type === "Added" ? "#0a7d29" : "#b8393d" }}
              >
                {item.type}
              </Grid>
              <Grid item xs={4}>
                {dateReadable(item.dateDone)}
              </Grid>
              <Grid item xs={3}>
                <span style={{ fontWeight: "bold" }}>{item.quantity}</span>{" "}
                <span>{inv.unit}</span>
              </Grid>
              <Grid item xs={2} className="link-like">
                See Docs
              </Grid>
            </Grid>
          ))}
        </>
      ) : (
        <p style={{ fontStyle: "italic" }}>No inventory history available.</p>
      )}
    </ModalCont>
  );
};
export default InvHistory;
