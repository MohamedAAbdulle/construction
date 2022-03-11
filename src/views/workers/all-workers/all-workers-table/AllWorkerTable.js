import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import { workerContext } from "../../WorkerContext";
import Createworker from "../all-workers-header/CreateWorker";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint } from "services/apiFunctions";

const AllWorkersTable = () => {
  const { getAllWorkers } = React.useContext(workerContext);

  const { allWorkers } = React.useContext(workerContext);
  const [openEditActive, setOpenEditWorker] = React.useState(false);
  const [openDeleteWorker, setOpenDeleteWorker] = React.useState(false);

  const deleteWorker = (id) => {
    deleteEndpoint(`/workers/${id}`).then(() => {
      getAllWorkers();
      setOpenDeleteWorker(false);
    });
  };

  const data = allWorkers.map((r) => {
    return [
      <div>{r.name}</div>,
      <div>{r.idNumber}</div>,
      <div>{r.workerType}</div>,
      <div>{r.rate}</div>,

      <Ellipsis
        menus={[
          {
            onClick: () => {},
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
