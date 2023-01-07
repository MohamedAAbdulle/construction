const supplierColumns = [
  {
    name: "Supplier Name",
    selector: (row) => row.name,
  },
  {
    name: "Address",
    selector: (row) => row.address,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
  },

  {
    name: "Email",
    selector: (row) => row.email,
  },

  {
    name: "",
    selector: (row) => row.actions,
  },
];

export default supplierColumns;
