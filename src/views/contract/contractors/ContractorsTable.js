import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import EditContrator from "./contractor-form/EditContractor";
import { deleteEndpoint } from "services/apiFunctions";
import { contractContext } from "../ContractContext";
import ConfirmationModal from "components/delete-modal/ConfirmationModal";

const ContractorsTable = ({ contractors }) => {
  const { getContractors } = React.useContext(contractContext);
  const [open, setOpen] = React.useState(false);
  const [openDeleteContractor, setOpenDeleteContractor] = React.useState(false);

  const onDelete = (id) => {
    deleteEndpoint(`/SubContracts/contractors/${id}`).then((res) => {
      if (res && res.status === 200) {
        getContractors();
      }
    });
  };
  return (
    <>
      <TableCont
        tableTitles={["Name", "Phone", "Email", ""]}
        dataList={contractors.map((contractor) => [
          contractor.name,
          contractor.phone,
          contractor.email,
          <Ellipsis
            menus={[
              {
                onClick: () => {
                  setOpen(contractor);
                },
                label: "Edit",
              },
              {
                onClick: () => {},
                label: "Contracts",
              },
              {
                onClick: () => {},
                label: "History",
              },
              {
                onClick: () => setOpenDeleteContractor(contractor),
                label: "Delete",
              },
            ]}
          />,
        ])}
      />
      <StickySlider clickState={Boolean(open)} setClickState={setOpen}>
        <EditContrator closeSlider={() => setOpen(false)} open={open} />
      </StickySlider>
      {openDeleteContractor && (
        <ConfirmationModal
          onClose={() => setOpenDeleteContractor(false)}
          deleteAction={() => onDelete(openDeleteContractor.id)}
          message={
            <>
              <strong>{openDeleteContractor.name}</strong> will be permanently
              deleted!
            </>
          }
          title="Delete Contractor"
        />
      )}
    </>
  );
};

export default ContractorsTable;
