import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { getEndpoint } from "services/apiFunctions";
import "./InvHistory.sass";
import fetchStatus from "components/fetch-status/fetchStatus";
import dateFormatter from "utils/dateFormatter";

const InvHistory = ({ open, onClose, inv }) => {
  const [state, setState] = React.useState();

  const getInvHistory = () => {
    getEndpoint(`/inventory/invhistory/${inv.id}`).then((res) =>
      setState(res.reverse())
    );
  };

  React.useEffect(getInvHistory, []);

  const colorType = (x) => {
    if (x === "CorrectionAdd" || x === "Delivery") return "green";
    else if (
      x === "CorrectionRemove" ||
      x === "DailyUsage" ||
      x === "UndoDelivery"
    )
      return "red";
  };
  const typeShorten = (x) => {
    if (x === "CorrectionAdd") return "Correction+";
    if (x === "CorrectionRemove") return "Correction-";
    else return x;
  };
  return (
    <ModalCont open={open} onClose={onClose} title={`History (${inv.name})`}>
      {fetchStatus(
        state,
        () => (
          <>
            {state.map((item, index) => (
              <div className="inv-history row gx-3 gy-3" key={index}>
                <div className={`${colorType(item.type)} col-3`}>
                  {typeShorten(item.type)}
                </div>
                <div className="col-4 text-nowrap">
                  {dateFormatter(item.dateDone, "DD-MMM-YY, HH:mm")}
                </div>
                <div className="col-3">
                  <span className="quantity">{item.quantity}</span>
                  <span>{inv.unit}</span>
                </div>
                <div className="link-like col-2 text-nowrap">See Docs</div>
              </div>
            ))}
          </>
        ),
        "No History Available"
      )}
    </ModalCont>
  );
};
export default InvHistory;
