import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import { workerContext } from "../../WorkerContext";
import Createworker from "../all-workers-header/CreateWorker";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint, postEndpoint } from "services/apiFunctions";
import dayjs from "dayjs";
import { appContext } from "AppContext";
import findEnumName from "utils/findEnumValue";

const AllWorkersTable = () => {
  const { WorkerTypes } = React.useContext(appContext);
  const { getAllWorkers, activeWeek, allWorkers } =
    React.useContext(workerContext);

  const [openEditActive, setOpenEditWorker] = React.useState(false);
  const [openDeleteWorker, setOpenDeleteWorker] = React.useState(false);

  const deleteWorker = (id) => {
    deleteEndpoint(`/workers/${id}`).then(() => {
      getAllWorkers();
      setOpenDeleteWorker(false);
    });
  };
  const activateWorker = (id) => {
    let dayNumber = dayjs()
      .day(dayjs().day() - 1)
      .day();
    let a = "00000000".split("");
    a.splice(dayNumber, 1, "1");
    postEndpoint(`/workers/activeworkers`, {
      workerId: id,
      chart: a.join(""),
      date: activeWeek.format("YYYY-MM-DD"),
    });
  };

  const data = allWorkers.map((r) => {
    return [
      <div>{r.name}</div>,
      <div>{r.idNumber}</div>,
      <div>{findEnumName(r.workerType, WorkerTypes)}</div>,
      <div>{r.rate}</div>,

      <Ellipsis
        menus={[
          {
            onClick: () => activateWorker(r.id),
            label: "Activate",
          },
          {
            onClick: () => {
              setOpenEditWorker(r);
            },
            label: "Edit",
          },
          { onClick: () => {}, label: "History" },
          {
            onClick: () => {
              setOpenDeleteWorker(r);
            },
            label: "Delete",
          },
        ]}
      />,
    ];
  });

  return (
    <>
      <TableCont
        tableTitles={["Name", "ID Number", "Worker Type", "Rate", ""]}
        dataList={data}
      />
      {openEditActive && (
        <Createworker
          open={true}
          setOpen={setOpenEditWorker}
          state={openEditActive}
        />
      )}
      {openDeleteWorker && (
        <DeleteModal
          onClose={() => setOpenDeleteWorker(false)}
          deleteAction={() => deleteWorker(openDeleteWorker.id)}
          message={`${openDeleteWorker.name} will be permanently deleted!`}
          title="Delete Worker"
        />
      )}
    </>
  );
};

export default AllWorkersTable;
