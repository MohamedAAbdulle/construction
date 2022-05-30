import { appContext } from "AppContext";
import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import SuppliersHead from "./SuppliersHead";
import SuppliersTable from "./SuppliersTable";

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
