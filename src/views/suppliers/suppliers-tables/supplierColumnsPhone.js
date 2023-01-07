const supplierColumnsPhone = [
  {
    name: "Supplier",
    selector: (row) => (
      <section>
        <div>{row.name}</div>
        <div>{row.address}</div>
      </section>
    ),
  },

  {
    name: "Contacts",
    selector: (row) => (
      <section>
        <div>{row.phone}</div>
        <div>{row.email}</div>
      </section>
    ),
  },

  {
    name: "",
    selector: (row) => row.actions,
    width: "40px",
  },
];

export default supplierColumnsPhone;
