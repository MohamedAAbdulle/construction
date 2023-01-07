import { digitsToCurrency } from "utils/currencyFormatter";

const orderColumns = [
  {
    name: "Material",
    selector: (row) => row.inventory,
  },
  {
    name: "Supplier",
    selector: (row) => row.supplier,
  },
  {
    name: "Quantity",
    selector: (row) => (
      <section>
        <div>{row.quantity}</div>
        <div>{digitsToCurrency(row.price)}/=</div>
      </section>
    ),
  },

  {
    name: "Date Updated",
    selector: (row) => row.dateDone,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "",
    selector: (row) => row.actions,
  },
];

export default orderColumns;
