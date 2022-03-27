import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import { workerContext } from "../WorkerContext";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint, putEndpoint } from "services/apiFunctions";
import { Switch } from "@material-ui/core";
import findEnumName from "utils/findEnumValue";
import { appContext } from "AppContext";

const ActiveWorkersTable = () => {
  const { appEnums } = React.useContext(appContext);

  const { activeWorkers, allWorkers, getActiveWorkers } =
    React.useContext(workerContext);

  const [openInactivate, setOpenInactivate] = React.useState(false);
  const [openUpdateChart, setOpenUpdateChart] = React.useState(false);

  const inactivateWorker = (id) => {
    deleteEndpoint(`/workers/activeWorkers/${id}`).then(() => {
      getActiveWorkers();
      setOpenInactivate(false);
    });
  };

  const updateChart = ({ worker, index }) => {
    let a = worker.chart[index];
    let b = a;
    if (worker.chart[index]) {
      b = worker.chart[index] === "0" ? "1" : "0";
    }
    let r = worker.chart.split("");
    r.splice(index, 1, b);

    putEndpoint(
      `/workers/activeWorkers/chart/${worker.id}?chart=${r.join("")}`,
      {}
    ).then((res) => {
      if (res && res.status === 200) {
        setOpenUpdateChart(false);
        getActiveWorkers();
      }
    });
  };

  const data = activeWorkers.map((activeWorker) => {
    const weeklyChartList = [];
    let total = 0;

    //get active worker Info from all workers list.
    const foundWorker =
      allWorkers.find((w) => w.id === activeWorker.workerId) || {};
    const { name, idNumber, workerType, rate } = foundWorker;
    activeWorker = { ...activeWorker, name, idNumber, workerType, rate };

    //format the weeklychart and total pay.
    for (let i = 0; i < 8; i++) {
      let d = activeWorker.chart[i];
      let s;
      s = (
        <Switch
          checked={Boolean(parseInt(d))}
          onChange={() =>
            setOpenUpdateChart({ worker: activeWorker, index: i })
          }
        />
      );
      weeklyChartList.push(s);
      if (i < 7 && parseInt(d)) total += activeWorker.rate;
    }

    return [
      <div>
        {activeWorker.name}
        <div className="sec-cell">{activeWorker.idNumber}</div>
      </div>,
      <div>
        <div>{findEnumName(activeWorker.workerType, appEnums.WorkerType)}</div>
        <div className="sec-cell">{activeWorker.rate}</div>
      </div>,
      ...weeklyChartList.slice(0, -1),
      total,
      weeklyChartList[7],
      <Ellipsis
        menus={[
          {
            onClick: () => {},
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
          "Total Due",
          "Payed",
          "",
        ]}
        dataList={data}
      />
      {openInactivate && (
        <DeleteModal
          onClose={() => setOpenInactivate(false)}
          deleteAction={() => inactivateWorker(openInactivate.id)}
          message={`${openInactivate.name} will be Inactivated!`}
          title="Inactivate Worker"
          btnTitle="Inactivate"
        />
      )}
      {openUpdateChart && (
        <DeleteModal
          onClose={() => setOpenUpdateChart(false)}
          deleteAction={() => updateChart(openUpdateChart)}
          message={`${openUpdateChart.worker.name}'s chart will be update!`}
          title="Update Chart"
          btnTitle="Update Chart"
        />
      )}
    </>
  );
};

export default ActiveWorkersTable;
