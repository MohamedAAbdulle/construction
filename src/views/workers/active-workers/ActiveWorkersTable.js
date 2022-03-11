import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { workerContext } from "../WorkerContext";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint } from "services/apiFunctions";

const ActiveWorkersTable = () => {
  const { activeWorkers, allWorkers, getActiveWorkers } =
    React.useContext(workerContext);

  const [openInactivate, setOpenInactivate] = React.useState(false);

  const inactivateWorker = (id) => {
    deleteEndpoint(`/workers/activeWorkers/${id}`).then(() => {
      getActiveWorkers();
      setOpenInactivate(false);
    });
  };

  const data = activeWorkers.map((activeWorker) => {
    const weeklyChartList = [];
    let total = 0;

    //format the weeklychart and total pay.
    for (let i = 0; i < 8; i++) {
      let s;
      if (parseInt(activeWorker.chart[i])) {
        s = <CheckCircle className="Present" />;
        if (i < 7) total += activeWorker.rate;
      } else s = <Cancel className="Absent" />;
      weeklyChartList.push(s);
    }

    //get active worker Info from all workers list.
    const foundWorker = allWorkers.find((w) => w.id === 3) || {};
    const { name, idNumber, workerType, rate } = foundWorker;
    activeWorker = { ...activeWorker, name, idNumber, workerType, rate };

    return [
      <div>
        {activeWorker.name}
        <div className="sec-cell">{activeWorker.idNumber}</div>
      </div>,
      <div>
        <div>{activeWorker.workerType}</div>
        <div className="sec-cell">{activeWorker.rate}</div>
      </div>,
      ...weeklyChartList.slice(0, -1),
      total,
      weeklyChartList[7],
      <Ellipsis
        menus={[
          { onClick: () => {}, label: "Pay Worker" },
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
    </>
  );
};

export default ActiveWorkersTable;
