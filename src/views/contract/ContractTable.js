import React from "react";
import { contractContext } from "./ContractContext";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import StickySlider from "components/sliderModal/StickySlider";
import EditContract from "./EditContract";
import { digitsToCurrency } from "utils/currencyFormatter";
import dateFormatter from "utils/dateFormatter";

const ContractTable = () => {
  const { contractList } = React.useContext(contractContext);
  const [open, setOpen] = React.useState(false);
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
        <EditContract closeSlider={() => setOpen(false)} open={open} />
      </StickySlider>
    </>
  );
};

export default ContractTable;
