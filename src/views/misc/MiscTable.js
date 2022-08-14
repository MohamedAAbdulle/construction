import React from "react";
import { deleteEndpoint } from "services/apiFunctions";
import { digitsToCurrency } from "utils/currencyFormatter";
import dateFormatter from "utils/dateFormatter";
import miscTableData from "./miscTableData";
import Ellipsis from "components/ellipsis/Ellipsis";
import DataTable from "react-data-table-component";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import MiscForm from "./MiscForm";
import DeleteModal from "components/delete-modal/DeleteModal";

const MiscTable = ({ miscList, getMiscs }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const deleteMisc = (id) => {
    deleteEndpoint(`/misc/${id}`).then(() => getMiscs());
  };

  React.useEffect(getMiscs, []);

  let _data = miscList.map((data) => {
    return {
      type: data.type,
      price: digitsToCurrency(data.price),
      description: (
        <Tooltip title={data.description}>
          <div className="clickable">{data.description}</div>
        </Tooltip>
      ),
      dateCreated: dateFormatter(data.dateCreated, "MMM DD, YYYY"),
      actions: (
        <div className="table-actions">
          <Ellipsis
            menus={[
              {
                onClick: () => {
                  setOpenEdit(data);
                },
                label: "Edit",
              },
              {
                onClick: () => setOpenDelete(data.id),
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
      {openEdit && (
        <MiscForm closeModal={() => setOpenEdit(false)} misc={openEdit} />
      )}
      {openDelete && (
        <DeleteModal
          onClose={() => setOpenDelete(false)}
          deleteAction={() => deleteMisc(openDelete)}
          message={`This Tool will be permanently deleted!`}
          title="Delete Tool"
        />
      )}
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
