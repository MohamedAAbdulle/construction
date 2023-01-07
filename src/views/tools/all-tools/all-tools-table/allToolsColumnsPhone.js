const allToolsColumnsPhone = [
  {
    name: "Tool",
    selector: (row) => row.name,
    grow: 1.5,
  },
  {
    name: "In Use",
    selector: (row) => (
      <div className="tools-quantity-ratio">
        <span>{row.inUse}</span>
        <span>/</span>
        <span>{row.quantity}</span>
      </div>
    ),
  },
  {
    name: "Last Modified",
    selector: (row) => row.lastModified,
    grow: 2,
  },
  {
    name: "",
    selector: (row) => row.actions,
    width: "40px",
  },
];

export default allToolsColumnsPhone;
