import React from "react";
import AddContractItem from "./AddContractItem";
import { Add } from "@material-ui/icons";
import { digitsToCurrency } from "utils/currencyFormatter";
import BtnComp from "components/btn-comp/BtnComp";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import fetchStatus from "components/fetch-status/fetchStatus";
import dateFormatter from "utils/dateFormatter";

const SubContract = ({ contractItems, onContractItemChanged }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="contract-items card-comp">
      <div className="card-title">
        Contract Items
        <BtnComp
          label="ADD"
          icon={<Add />}
          onClick={() => setOpen([])}
          size="sm"
        />
      </div>

      {fetchStatus(
        contractItems,
        () => (
          <TableCont
            tableTitles={[
              "Contract item",
              "Price",
              "Start & End",
              "Status",
              "",
            ]}
            classes={contractItems.map((x) => x.editedAction)}
            dataList={contractItems.map((cont, index) => [
              cont.name,
              digitsToCurrency(cont.price),
              `${dateFormatter(cont.startDate, "DD-MM-YY")} to ${dateFormatter(
                cont.endDate,
                "DD-MM-YY"
              )}`,
              cont.status,
              <Ellipsis
                menus={[
                  {
                    onClick: () => {
                      setOpen([cont, index]);
                    },
                    label: "Edit",
                  },
                  {
                    onClick: () => {},
                    label: "Documents",
                  },

                  cont.editedAction !== "Deleted" &&
                    cont.editedAction !== "Created" && {
                      onClick: () => {
                        onContractItemChanged(index, {
                          ...cont,
                          editedAction: "Deleted",
                        });
                      },
                      label: "Delete",
                    },

                  cont.editedAction && {
                    onClick: () => {
                      onContractItemChanged(index, {
                        ...cont,
                        editedAction: "Canceled",
                      });
                    },
                    label: "Reverse",
                  },
                ]}
              />,
            ])}
          />
        ),
        "No Contract Items"
      )}

      {open && (
        <AddContractItem
          onClose={() => setOpen(false)}
          open={open}
          onContractItemChanged={onContractItemChanged}
          //subName={sub.name}
          //onAction={onPricePointAdd}
        />
      )}
    </div>
  );
};

export default SubContract;
