import { digitsToCurrency } from "utils/currencyFormatter";

const orderColumnsPhone = [
  {
    name: "Material",
    selector: (row) => (
      <section>
        <div>{row.inventory}</div>
        <div>{row.supplier}</div>
      </section>
    ),
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
    name: "Status",
    selector: (row) => (
      <section>
        <div>{row.status}</div>
        <div>{row.dateDone}</div>
      </section>
    ),
  },
  {
    name: "",
    selector: (row) => row.actions,
    width: "40px",
  },
];

export default orderColumnsPhone;
