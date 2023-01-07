const inUseToolsColumns = [
  {
    name: "Tool",
    selector: (row) => row.toolName,
  },
  {
    name: "Worker Assigned",
    selector: (row) => row.workerName,
    grow: 0.5,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
  },
  {
    name: "Date Assigned",
    selector: (row) => row.dateAssigned,
  },
  {
    name: "",
    selector: (row) => row.actions,
  },
];

export default inUseToolsColumns;
