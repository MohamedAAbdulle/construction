import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { Grid } from "@material-ui/core";
import { appContext } from "AppContext";
import { getEndpoint } from "services/apiFunctions";
import dayjs from "dayjs";
import "./InvHistory.sass";

const InvHistory = ({ open, onClose, inv }) => {
  const r = React.useContext(appContext);
  const [state, setState] = React.useState([]);

  const getInvHistoryy = () => {
    console.log("test");
    r.getEndpoint(`/invhistory/${inv.id}`, 2).then((res) => setState(res));
    getEndpoint(`/inventory/invhistory/${inv.id}`).then((res) =>
      console.log(res)
    );
  };
  const getInvHistory = () => {
    getEndpoint(`/inventory/invhistory/${inv.id}`).then((res) => setState(res));
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
            <div className="inv-history" key={index}>
              <div className={item.type}>{item.type}</div>
              <div>{dayjs(item.dateDone).format("DD-MMM-YY, HH:MM")}</div>
              <div>
                <span className="quantity">{item.quantity}</span>
                <span>{inv.unit}</span>
              </div>
              <div className="link-like">See Docs</div>
            </div>
          ))}
        </>
      ) : (
        <p style={{ fontStyle: "italic" }}>No inventory history available.</p>
      )}
    </ModalCont>
  );
};
export default InvHistory;
