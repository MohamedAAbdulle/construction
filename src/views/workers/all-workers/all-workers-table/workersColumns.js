const workersColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "ID Number",
    selector: (row) => row.idNumber,
  },
  {
    name: "Worker Type",
    selector: (row) => row.workerType,
  },
  {
    name: "Rate",
    selector: (row) => row.rate,
  },
  {
    name: "",
    selector: (row) => row.actions,
  },
];

export default workersColumns;

export const invTableColumnsPhone = [
  {
    name: "Name",
    selector: (row) => (
      <section>
        <div>{row.name}</div>
        <div>{row.unit}</div>
      </section>
    ),
    grow: 0.5,
  },
  {
    name: "Quantity",
    selector: (row) => (
      <section>
        <div>{row.quantity}</div>
        <div>{row.status}</div>
      </section>
    ),
    grow: 0.5,
  },
  {
    name: "UPDATED",
    selector: (row) => (
      <section>
        <div>{row.modifiedDateOnly}</div>
        <div>{row.modifiedTime}</div>
      </section>
    ),
    grow: 1,
  },
  {
    name: "",
    selector: (row) => row.actions,
    //grow: 1 / 2,
    width: "40px",
  },
];
