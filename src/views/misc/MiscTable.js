import React from "react";
import { deleteEndpoint, getEndpoint } from "services/apiFunctions";
import { digitsToCurrency } from "utils/currencyFormatter";
import dateFormatter from "utils/dateFormatter";
import miscTableData, { miscList as _miscList } from "./miscTableData";
import Ellipsis from "components/ellipsis/Ellipsis";
import DataTable from "react-data-table-component";

const MiscTable = () => {
  const [miscList, setMiscList] = React.useState(_miscList);

  const getMisc = () => {
    getEndpoint("/inventory").then((res) => setMiscList(_miscList));
  };
  const deleteMisc = (id) => {
    deleteEndpoint(`/misc/${id}`).then(() => getMisc());
  };

  React.useEffect(getMisc, []);

  let _data = miscList.map((data) => {
    return {
      type: data.type,
      price: digitsToCurrency(data.price),
      description: <div>{data.description}</div>,
      dateCreated: dateFormatter(data.dateCreated, "MMM DD, YYYY"),
      actions: (
        <div className="table-actions">
          <Ellipsis
            menus={[
              {
                onClick: () => {},
                label: "Edit",
              },
              {
                onClick: deleteMisc,
                label: "Delete",
              },
            ]}
          ></Ellipsis>
        </div>
      ),
    };
  });

  return (
    <>
      <div className="summary-list">
        <DataTable
          columns={miscTableData}
          data={_data}
          // sortFunction={sortFunction}
        />
        {/* <CustomPagination setRequest={setRequest} request={request} /> */}
      </div>
      {/* <StickySlider
        clickState={newCustomerOpen}
        setClickState={setNewCustomerOpen}
      >
        <NewCustomer
          setNewCustomerOpen={setNewCustomerOpen}
          fxn={getCustomers}
        />
      </StickySlider>
      <SliderModal
        clickState={customerDetailsOpen}
        setClickState={setCustomerDetailsOpen}
      >
        <CustomerDetails
          setCustomerDetailsOpen={setCustomerDetailsOpen}
          shipperId={sId}
          fxn={getCustomers}
        />
      </SliderModal> */}
    </>
  );
};

export default MiscTable;
