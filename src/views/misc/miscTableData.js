const miscTableData = [
  {
    name: "Misc Type",
    selector: (row) => row.miscType,
  },
  {
    name: "Misc Amount",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    grow: 3,
  },
  {
    name: "Date Created",
    selector: (row) => row.dateCreated,
    grow: 1.5,
    sortable: true,
  },
  {
    name: "ACTIONS",
    selector: (row) => row.actions,
    grow: 0.7,
  },
];

export default miscTableData;
