import { appContext } from "AppContext";
import React from "react";
import SuppliersHead from "./SuppliersHead";
import SuppliersTable from "./SuppliersTable";

const Suppliers = () => {
  const { getSuppliers, suppliers } = React.useContext(appContext);

  React.useEffect(getSuppliers, []);
  return (
    <div>
      {suppliers && (
        <>
          <SuppliersHead />
          <SuppliersTable />
        </>
      )}
    </div>
  );
};

export default Suppliers;
