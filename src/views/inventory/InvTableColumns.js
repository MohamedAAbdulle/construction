const invTableColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Unit",
    selector: (row) => row.unit,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    grow: 1,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    grow: 1,
  },
  {
    name: "Last Modified",
    selector: (row) => row.modifiedDate,
    grow: 1.5,
  },
  {
    name: "ACTIONS",
    selector: (row) => row.actions,
    grow: 0.4,
  },
];

export default invTableColumns;

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
