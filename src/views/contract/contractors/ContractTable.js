import React from "react";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import { digitsToCurrency } from "utils/currencyFormatter";
import dateFormatter from "utils/dateFormatter";
import EditContrator from "./contractor-form/EditContractor";
import { contractContext } from "../ContractContext";

const ContractTable = () => {
  const { contractList } = React.useContext(contractContext);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableCont
        tableTitles={[
          "Name",
          "Contractor",
          "Total Price",
          "Date Modified",
          "Status",
          "",
        ]}
        dataList={contractList.map((inv) => [
          inv.contract,
          inv.contractor,
          digitsToCurrency(inv.totalPrice),
          dateFormatter(inv.modifiedDate,"DD-MMM-YY HH:mm"),
          inv.status,
          <Ellipsis
            menus={[
              {
                onClick: () => {
                  setOpen(inv);
                },
                label: "Edit",
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

export default ContractTable;
