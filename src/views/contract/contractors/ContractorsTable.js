import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import { digitsToCurrency } from "utils/currencyFormatter";
import dateFormatter from "utils/dateFormatter";
import EditContrator from "./contractor-form/EditContractor";
import { contractContext } from "../ContractContext";

const ContractorsTable = ({ contractors }) => {
  const [open, setOpen] = React.useState(false);
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
                onClick: () => {},
                label: "Delete",
              },
            ]}
          />,
        ])}
      />
      <StickySlider clickState={Boolean(open)} setClickState={setOpen}>
        <EditContrator closeSlider={() => setOpen(false)} open={open} />
      </StickySlider>
    </>
  );
};

export default ContractorsTable;
