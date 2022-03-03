import React from "react";
import InventoryHead from "views/inventory/InventoryHead";
import InventoryTable from "views/inventory/InventoryTable";
import { InventoryContext } from "./InventoryContext";

const Inventory = () => {
  return (
    <div>
      <InventoryContext>
        <InventoryHead />
        <InventoryTable />
      </InventoryContext>
    </div>
  );
};

export default Inventory;
