import { appContext } from "AppContext";
import fetchStatus from "components/fetch-status/fetchStatus";
import React from "react";
import InventoryHead from "views/inventory/InventoryHead";
import InventoryTable from "views/inventory/InventoryTable";

const Inventory = () => {
  const { invList, getInvList } = React.useContext(appContext);
  React.useEffect(() => getInvList(), []);
  return (
    <div>
      <InventoryHead />
      {fetchStatus(
        invList,
        () => (
          <InventoryTable invList={invList} />
        ),
        "No Inventory"
      )}
    </div>
  );
};

export default Inventory;
