import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import ConfirmationModal from "components/delete-modal/ConfirmationModal";
import { deleteEndpoint, putEndpoint } from "services/apiFunctions";
import { Switch } from "@material-ui/core";
import findWorkerTypeName from "utils/findEnumValue";
import { appContext } from "AppContext";

const ActiveWorkersTable = ({
  activeWorkers,
  allWorkers,
  getActiveWorkers,
  updateTotalPay,
}) => {
  const { WorkerTypes } = React.useContext(appContext);

  const [openInactivate, setOpenInactivate] = React.useState(false);
  const [openUpdateChart, setOpenUpdateChart] = React.useState(false);
  const [openPayWorker, setOpenPayWorker] = React.useState(false);

  const inactivateWorker = (id) => {
    deleteEndpoint(`/workers/activeWorkers/${id}`).then(() => {
      getActiveWorkers();
      setOpenInactivate(false);
    });
  };

  const sendUpdatedChartToApi = (id, chart) => {
    putEndpoint(`/workers/activeWorkers/chart/${id}?chart=${chart}`, {}).then(
      (res) => {
        if (res && res.status === 200) {
          setOpenUpdateChart(false);
          getActiveWorkers("don't refresh"); //expensive. this is involves alot of work.
        }
      }
    );
  };

  const payWorker = (worker) => {
    let a = worker.chart.slice(0, -1);
    if (a.includes("1")) {
      sendUpdatedChartToApi(worker.id, a.replaceAll("1", "2") + "2"); //improve
    }
  };

  const updateChart = ({ worker, index }) => {
    let a = worker.chart[index];
    let b = a;
    if (a) {
      if (a === "0" || a === "2") b = "1";
      else if (a === "1") b = "0";
    }
    let r = worker.chart.split("");
    r.splice(index, 1, b);
    sendUpdatedChartToApi(worker.id, r.join(""));
  };

  const actionLabel = (y) => {
    let a = "Update Worker";
    let x = y.worker.chart[y.index];
    console.log(x);
    if (x === "0") a = "Record Worked Day";
    else if (x === "1") a = "UnRecord Work  Day";
    else if (x === "2") a = "UnPay Worker";
    return a;
  };

  let allDueTotal = 0;
  let allPaidTotal = 0;

  const data = activeWorkers.map((activeWorker, index) => {
    const weeklyChartList = [];
    let dueTotal = 0;
    let paidTotal = 0;

    //get active worker Info from all workers list.
    const foundWorker =
      allWorkers.find((w) => w.id === activeWorker.workerId) || {};
    const { name, idNumber, workerType, rate } = foundWorker;
    activeWorker = { ...activeWorker, name, idNumber, workerType, rate };

    //format the weeklychart and total pay.
    for (let i = 0; i < 8; i++) {
      let currentValue = parseInt(activeWorker.chart[i]);
      if (i < 7) {
        let currentSwitch = (
          <Switch
            className={currentValue === 2 && `uii`}
            checked={Boolean(currentValue)}
            onChange={() =>
              setOpenUpdateChart({ worker: activeWorker, index: i })
            }
          />
        );
        weeklyChartList.push(currentSwitch);
      }
      if (i < 7 && currentValue === 1) dueTotal += activeWorker.rate;
      if (i < 7 && currentValue === 2) paidTotal += activeWorker.rate;
      else if (i === 7 /* && activeWorker.chart[i] === "0" */) {
        allDueTotal += dueTotal;
        allPaidTotal += paidTotal;
        //updateTotalPay(total);
      }
    }
    if (index === activeWorkers.length - 1) {
      let o = { allDueTotal, allPaidTotal };
      updateTotalPay(o);
    }

    return [
      <div>
        {activeWorker.name}
        <div className="sec-cell">{activeWorker.idNumber}</div>
      </div>,
      <div>
        <div>{findWorkerTypeName(activeWorker.workerType, WorkerTypes)}</div>
        <div className="sec-cell">{activeWorker.rate}</div>
      </div>,
      ...weeklyChartList,
      <div className="text-nowrap">
        <span className="red">{dueTotal}</span> |{" "}
        <span className="green">{paidTotal}</span>
      </div>,
      <Ellipsis
        menus={[
          {
            onClick: () => setOpenPayWorker(activeWorker),
            label: "Pay Worker",
          },
          {
            onClick: () => setOpenInactivate(activeWorker),
            label: "Inactivate",
          },
        ]}
      />,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={[
          "Name",
          "Worker Type",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Due/Paid",
          "Payed",
          "",
        ]}
        dataList={data}
      />
      {openInactivate && (
        <ConfirmationModal
          onClose={() => setOpenInactivate(false)}
          deleteAction={() => inactivateWorker(openInactivate.id)}
          message={`${openInactivate.name} will be Inactivated!`}
          title="Inactivate Worker"
          btnTitle="Inactivate"
        />
      )}
      {openUpdateChart && (
        <ConfirmationModal
          onClose={() => setOpenUpdateChart(false)}
          deleteAction={() => updateChart(openUpdateChart)}
          message={`${openUpdateChart.worker.name}'s chart will be update!`}
          title={actionLabel(openUpdateChart)}
          btnTitle={actionLabel(openUpdateChart)}
        />
      )}
      {openPayWorker && (
        <ConfirmationModal
          onClose={() => setOpenPayWorker(false)}
          deleteAction={() => payWorker(openPayWorker)}
          message={`${openPayWorker.name}'s chart will be update!`}
          title="Pay Worker"
          btnTitle="Pay Worker"
        />
      )}
    </>
  );
};

export default ActiveWorkersTable;
