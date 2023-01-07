const workersColumnsPhone = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "ID Number",
    selector: (row) => row.idNumber,
  },
  {
    name: "Type / Rate",
    selector: (row) => (
      <section>
        <div>{row.workerType}</div>
        <div>{row.rate}</div>
      </section>
    ),
  },
  {
    name: "",
    selector: (row) => row.actions,
    width: "40px",
  },
];
export default workersColumnsPhone;
