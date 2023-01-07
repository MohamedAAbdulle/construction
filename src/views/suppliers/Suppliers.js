import { appContext } from "AppContext";
import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import SuppliersTable from "./suppliers-tables/SuppliersTable";
import SuppliersHead from "./SuppliersHead";

const Suppliers = () => {
  const { getSuppliers, suppliers } = React.useContext(appContext);

  React.useEffect(getSuppliers, []);
  return (
    <div>
      <SuppliersHead />
      {fetchStatus(
        suppliers,
        () => (
          <SuppliersTable suppliers={suppliers} getSuppliers={getSuppliers} />
        ),
        "No Suppliers"
      )}
    </div>
  );
};

export default Suppliers;
