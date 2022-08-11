const miscTableData = [
  {
    name: "Misc Type",
    selector: (row) => row.type,
    
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

export const miscList = [
  {
    id: 1,
    price: 1200,
    type: "Sale",
    dateCreated: "2022-06-23T18:05",
    description:
      "Bought 18 pad Locks for the front gate and Door fixes for the office building",
  },
  {
    id: 2,
    price: 6800,
    type: "Sale",
    dateCreated: "2022-07-18T13:35",
    description:
      "Bought 18 pad Locks for the front gate and Door fixes for the office building",
  },
  {
    id: 3,
    price: 750,
    type: "Sale",
    dateCreated: "2022-07-11T13:35",
    description:
      "Bought 18 pad Locks for the front gate and Door fixes for the office building",
  },
];

export default miscTableData;
