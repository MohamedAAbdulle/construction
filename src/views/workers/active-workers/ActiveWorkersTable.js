import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { activeWorkersContext } from "./ActiveWorkerContext";

const ActiveWorkersTable = () => {
  const { activeWorkers } = React.useContext(activeWorkersContext);

  const data = activeWorkers.map((r) => {
    const weeklyChartList = [];
    let total = 0;
    for (let i = 0; i < 8; i++) {
      let s;
      if (parseInt(r.weeklyChart[i])) {
        s = <CheckCircle className="Present" />;
        if (i < 7) total += r.rate;
      } else s = <Cancel className="Absent" />;
      weeklyChartList.push(s);
    }

    return [
      <div>
        {r.name}
        <div className="sec-cell">{r.idNumber}</div>
      </div>,
      <div>
        <div>{r.workerType}</div>
        <div className="sec-cell">{r.rate}</div>
      </div>,
      ...weeklyChartList.slice(0, -1),
      total,
      weeklyChartList[7],
      <Ellipsis
        menus={[
          { onClick: () => {}, label: "Pay Worker" },
          { onClick: () => {}, label: "Inactivate" },
        ]}
      />,
    ];
  });

  return (
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
  );
};

export default ActiveWorkersTable;
