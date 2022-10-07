const userTableData = [
  {
    name: "Email",
    selector: (row) => row.email,
    grow: 2,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    grow: 2,
  },
  {
    name: "User Type",
    selector: (row) => row.type,
    //grow: 3,
  },
  {
    name: "Date Created",
    selector: (row) => row.dateCreated,
    //grow: 1.5,
    sortable: true,
  },
  {
    name: "Actions",
    selector: (row) => row.actions,
    grow: 0.5,
  },
];

export default userTableData;
