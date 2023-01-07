import React from "react";
import Ellipsis from "components/ellipsis/Ellipsis";
import { workerContext } from "../../WorkerContext";
import Createworker from "../all-workers-header/CreateWorker";
import ConfirmationModal from "components/delete-modal/ConfirmationModal";
import { deleteEndpoint, postEndpoint } from "services/apiFunctions";
import dayjs from "dayjs";
import { appContext } from "AppContext";
import findWorkerTypeName from "utils/findEnumValue";
import DataTable from "react-data-table-component";
import workersColumns from "./workersColumns";
import workersColumnsPhone from "./workersColumnsPhone";

const AllWorkersTable = () => {
  const { WorkerTypes } = React.useContext(appContext);
  const { getAllWorkers, allWorkers } = React.useContext(workerContext);

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
      date: dayjs().subtract(1, "days").day(1).format("YYYY-MM-DD"),
    });
  };

  const data = allWorkers.map((r) => ({
    name: r.name,
    idNumber: r.idNumber,
    workerType: findWorkerTypeName(r.workerType, WorkerTypes),
    rate: r.rate,
    actions: (
      <div className="table-actions">
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
        />
      </div>
    ),
  }));

  return (
    <>
      <div className="summary-list desktop-only">
        <DataTable columns={workersColumns} data={data} />
      </div>
      <div className="summary-list phone-only">
        <DataTable columns={workersColumnsPhone} data={data} />
      </div>

      {openEditActive && (
        <Createworker
          open={true}
          setOpen={setOpenEditWorker}
          state={openEditActive}
        />
      )}
      {openDeleteWorker && (
        <ConfirmationModal
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
