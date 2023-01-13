import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import { getEndpoint } from "services/apiFunctions";
import "./InvHistory.sass";
import fetchStatus from "components/fetch-status/fetchStatus";
import dateFormatter from "utils/dateFormatter";
import DataTable from "react-data-table-component";
import Ellipsis from "components/ellipsis/Ellipsis";

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

  const columns = [
    {
      selector: (row) => row.type,
      grow: 3,
    },
    {
      selector: (row) => row.datedone,
      grow: 3,
    },
    {
      selector: (row) => row.quantity,
      grow: 2,
    },
    {
      selector: (row) => row.actions,
      width: "40px",
    },
  ];
  const historyData = state?.map((item) => ({
    type: (
      <div className={`${colorType(item.type)} `}>{typeShorten(item.type)}</div>
    ),
    datedone: (
      <section>
        <div>{dateFormatter(item.dateDone, "DD-MMM-YY")}</div>
        <div>{dateFormatter(item.dateDone, "HH:mm")}</div>
      </section>
    ),
    quantity: (
      <section>
        <div className="quantity">{item.quantity}</div>
        <div>{inv.unit}</div>
      </section>
    ),
    actions: (
      <div className="table-actions">
        <Ellipsis
          menus={[
            {
              onClick: () => {},
              label: "Documents",
            },
          ]}
        />
      </div>
    ),
  }));
  return (
    <ModalCont open={open} onClose={onClose} title={`History (${inv.name})`}>
      {fetchStatus(
        state,
        () => (
          <>
            <div className="summary-list">
              <DataTable
                columns={columns}
                data={historyData}
                noTableHead={true}
              />
            </div>
            {/* {state.map((item, index) => (
              <div className="inv-history row gx-3 gy-3" key={index}>
                <div className={`${colorType(item.type)} col-3`}>
                  {typeShorten(item.type)}
                </div>
                <div className="col-4 text-nowrap">
                  <div>{dateFormatter(item.dateDone, "DD-MMM-YY")}</div>
                  <div>{dateFormatter(item.dateDone, "HH:mm")}</div>
                </div>
                <div className="col-3">
                  <div className="quantity">{item.quantity}</div>
                  <div>{inv.unit}</div>
                </div>
                <div className="link-like col-2 text-nowrap">Docs</div>
              </div>
            ))} */}
          </>
        ),
        "No History Available"
      )}
    </ModalCont>
  );
};
export default InvHistory;
