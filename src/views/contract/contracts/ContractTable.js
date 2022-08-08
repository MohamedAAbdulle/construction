import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import { digitsToCurrency } from "utils/currencyFormatter";
import dateFormatter from "utils/dateFormatter";
import { contractContext } from "../ContractContext";
import EditContract from "./contract-form/EditContract";
import DeleteModal from "components/delete-modal/DeleteModal";
import { deleteEndpoint } from "services/apiFunctions";

const ContractTable = ({ contracts, contractors }) => {
  const { getContracts } = React.useContext(contractContext);
  const [open, setOpen] = React.useState(false);
  const [openDeleteContract, setOpenDeleteContract] = React.useState(false);

  const onDelete = (id) => {
    deleteEndpoint(`/SubContracts/${id}`).then((res) => {
      if (res && res.status === 200) {
        getContracts();
        setOpenDeleteContract(false);
      }
    });
  };
  return (
    <>
      <TableCont
        tableTitles={[
          "Contract",
          "Contractor",
          "Total Price",
          "Date Modified",
          "Status",
          "",
        ]}
        dataList={contracts.map((inv) => {
          /* const findContractorName = (inv.contractor) => {
            let a = (contractors || [{}]).find((c) => c.name) || {};
            return a.name;
          }; */
          let contractorName;
          if (contractors && contractors.length) {
            let a = contractors.find((c) => c.id === inv.contractorId);
            contractorName = a && a.name ? a.name : "";
          }

          return [
            inv.name,
            contractorName || <i style={{ color: "red" }}>No Contractor</i>,
            digitsToCurrency(inv.totalPrice),
            dateFormatter(inv.lastModified, "DD-MMM-YY HH:mm"),
            inv.status,
            <Ellipsis
              menus={[
                {
                  onClick: () => {
                    setOpen({ ...inv, contractorName });
                  },
                  label: "Edit",
                },
                {
                  onClick: () => {
                    setOpenDeleteContract(inv);
                  },
                  label: "Delete",
                },
              ]}
            />,
          ];
        })}
      />
      <StickySlider clickState={Boolean(open)} setClickState={setOpen}>
        <EditContract closeSlider={() => setOpen(false)} open={open} />
      </StickySlider>
      {openDeleteContract && (
        <DeleteModal
          onClose={() => setOpenDeleteContract(false)}
          deleteAction={() => onDelete(openDeleteContract.id)}
          message={
            <>
              <strong>{openDeleteContract.name}</strong> will be permanently
              deleted!
            </>
          }
          title="Delete Contract"
        />
      )}
    </>
  );
};

export default ContractTable;
