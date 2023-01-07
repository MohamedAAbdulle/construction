const allToolsColumns = [
  {
    name: "Tool Name",
    selector: (row) => row.name,
  },
  {
    name: "Total Amount",
    selector: (row) => row.quantity,
    grow: 0.5,
  },
  {
    name: "In Use",
    selector: (row) => row.inUse,
  },
  {
    name: "In Store",
    selector: (row) => row.inStore,
  },
  {
    name: "Last Modified",
    selector: (row) => row.lastModified,
  },
  {
    name: "",
    selector: (row) => row.actions,
  },
];

export default allToolsColumns;
